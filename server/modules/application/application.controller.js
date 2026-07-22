const { ObjectId } = require('mongodb');
const { getDB } = require('../../config/db');

// 1. Create Application
const createApplication = async (req, res, next) => {
  try {
    const { companyName, jobTitle, jobUrl, source, status, applicationDate, notes } = req.body;

    if (!companyName || !jobTitle || !applicationDate) {
      res.status(400);
      return next(new Error('Company name, job title, and application date are required!'));
    }

    const newApp = {
      userId: new ObjectId(req.user.id),
      companyName,
      jobTitle,
      jobUrl: jobUrl || '',
      source: source || 'Other',
      status: status || 'Saved',
      applicationDate: new Date(applicationDate),
      notes: notes || '',
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const db = getDB();
    const result = await db.collection('applications').insertOne(newApp);

    res.status(201).json({ success: true, application: { _id: result.insertedId, ...newApp } });
  } catch (err) {
    next(err);
  }
};

// 2. Get All Applications (with Search, Filter, Sort)
const getApplications = async (req, res, next) => {
  try {
    const db = getDB();
    const { search, status, source, sort } = req.query;

    let query = { userId: new ObjectId(req.user.id) };

    if (search) {
      query.$or = [
        { companyName: { $regex: search, $options: 'i' } },
        { jobTitle: { $regex: search, $options: 'i' } }
      ];
    }

    if (status) query.status = status;
    if (source) query.source = source;

    let sortOptions = { createdAt: -1 };
    if (sort === 'oldest') sortOptions = { createdAt: 1 };

    const applications = await db.collection('applications')
      .find(query)
      .sort(sortOptions)
      .toArray();

    res.status(200).json({ success: true, count: applications.length, applications });
  } catch (err) {
    next(err);
  }
};

// 3. Get Dashboard Stats
const getDashboardStats = async (req, res, next) => {
  try {
    const db = getDB();
    const userId = new ObjectId(req.user.id);

    const apps = await db.collection('applications').find({ userId }).toArray();

    const stats = {
      total: apps.length,
      saved: apps.filter(a => a.status === 'Saved').length,
      applied: apps.filter(a => a.status === 'Applied').length,
      assessment: apps.filter(a => a.status === 'Assessment').length,
      interview: apps.filter(a => a.status === 'Interview').length,
      rejected: apps.filter(a => a.status === 'Rejected').length,
      offer: apps.filter(a => a.status === 'Offer').length,
      recent: apps.sort((a, b) => b.createdAt - a.createdAt).slice(0, 5)
    };

    res.status(200).json({ success: true, stats });
  } catch (err) {
    next(err);
  }
};

// 4. Update Application
const updateApplication = async (req, res, next) => {
  try {
    const db = getDB();
    const { id } = req.params;

    const updatedData = { ...req.body, updatedAt: new Date() };
    if (updatedData.applicationDate) updatedData.applicationDate = new Date(updatedData.applicationDate);

    const result = await db.collection('applications').findOneAndUpdate(
      { _id: new ObjectId(id), userId: new ObjectId(req.user.id) },
      { $set: updatedData },
      { returnDocument: 'after' }
    );

    if (!result) {
      res.status(404);
      return next(new Error('Application not found or unauthorized!'));
    }

    res.status(200).json({ success: true, application: result });
  } catch (err) {
    next(err);
  }
};

// 5. Delete Application
const deleteApplication = async (req, res, next) => {
  try {
    const db = getDB();
    const result = await db.collection('applications').deleteOne({
      _id: new ObjectId(req.params.id),
      userId: new ObjectId(req.user.id)
    });

    if (result.deletedCount === 0) {
      res.status(404);
      return next(new Error('Application not found or unauthorized!'));
    }

    res.status(200).json({ success: true, message: 'Application deleted successfully' });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createApplication,
  getApplications,
  getDashboardStats,
  updateApplication,
  deleteApplication
};