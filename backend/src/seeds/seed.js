require('dotenv').config();
const mongoose = require('mongoose');
const Permission = require('../models/Permission');
const Role = require('../models/Role');
const User = require('../models/User');
const Department = require('../models/Department');

const PERMISSIONS = [
  { name: 'manage_employees', description: 'Create, update, delete employees' },
  { name: 'view_employees', description: 'View employee list and details' },
  { name: 'manage_departments', description: 'Manage departments' },
  { name: 'view_departments', description: 'View departments' },
  { name: 'manage_roles', description: 'Manage roles and permissions' },
  { name: 'view_roles', description: 'View roles' },
  { name: 'manage_leave_requests', description: 'Manage all leave requests' },
  { name: 'submit_leave', description: 'Submit and cancel own leave requests' },
  { name: 'approve_leave', description: 'Approve leave requests' },
  { name: 'reject_leave', description: 'Reject leave requests' },
  { name: 'view_dashboard', description: 'View dashboard statistics' },
  { name: 'export_reports', description: 'Export reports' },
  { name: 'view_logs', description: 'View activity logs' },
  { name: 'manage_own_profile', description: 'Update own profile' },
];

const ROLE_PERMISSIONS = {
  Administrator: PERMISSIONS.map((p) => p.name),
  'HR Manager': [
    'manage_employees', 'view_employees', 'manage_departments', 'view_departments',
    'view_roles', 'manage_leave_requests', 'approve_leave', 'reject_leave',
    'view_dashboard', 'export_reports', 'view_logs', 'manage_own_profile', 'submit_leave',
  ],
  'Project Manager': [
    'view_employees', 'view_departments', 'view_dashboard', 'approve_leave', 'reject_leave',
    'manage_leave_requests', 'manage_own_profile', 'submit_leave', 'view_logs',
  ],
  Technician: ['view_employees', 'manage_own_profile', 'submit_leave'],
  Commercial: ['view_employees', 'manage_own_profile', 'submit_leave'],
  Employee: ['manage_own_profile', 'submit_leave'],
};

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB for seeding...');

    await Promise.all([
      Permission.deleteMany({}),
      Role.deleteMany({}),
      User.deleteMany({}),
      Department.deleteMany({}),
    ]);

    const permissions = await Permission.insertMany(PERMISSIONS);
    const permMap = Object.fromEntries(permissions.map((p) => [p.name, p._id]));

    const roles = [];
    for (const [roleName, perms] of Object.entries(ROLE_PERMISSIONS)) {
      roles.push({
        name: roleName,
        description: `${roleName} role for CEMS`,
        permissions: perms.map((name) => permMap[name]),
      });
    }
    const insertedRoles = await Role.insertMany(roles);
    const adminRole = insertedRoles.find((r) => r.name === 'Administrator');
    const hrRole = insertedRoles.find((r) => r.name === 'HR Manager');
    const employeeRole = insertedRoles.find((r) => r.name === 'Employee');

    const itDept = await Department.create({
      name: 'IT',
      description: 'Information Technology Department',
    });
    const hrDept = await Department.create({
      name: 'Human Resources',
      description: 'HR Department',
    });

    await User.create({
      employeeId: 'EMP00001',
      firstName: 'Admin',
      lastName: 'Canal',
      email: process.env.ADMIN_EMAIL || 'admin@canalinformatique.ma',
      phone: '+212600000001',
      password: process.env.ADMIN_PASSWORD || 'Admin@123456',
      gender: 'Male',
      position: 'System Administrator',
      departmentId: itDept._id,
      roleId: adminRole._id,
      status: 'Active',
    });

    await User.create({
      employeeId: 'EMP00002',
      firstName: 'Sara',
      lastName: 'Benali',
      email: 'hr@canalinformatique.ma',
      phone: '+212600000002',
      password: 'Hr@123456',
      gender: 'Female',
      position: 'HR Manager',
      departmentId: hrDept._id,
      roleId: hrRole._id,
      status: 'Active',
    });

    await User.create({
      employeeId: 'EMP00003',
      firstName: 'Youssef',
      lastName: 'Alami',
      email: 'employee@canalinformatique.ma',
      phone: '+212600000003',
      password: 'Employee@123',
      gender: 'Male',
      position: 'Software Developer',
      departmentId: itDept._id,
      roleId: employeeRole._id,
      status: 'Active',
    });

    itDept.managerId = (await User.findOne({ email: 'admin@canalinformatique.ma' }))._id;
    hrDept.managerId = (await User.findOne({ email: 'hr@canalinformatique.ma' }))._id;
    await itDept.save();
    await hrDept.save();

    console.log('Seed completed successfully!');
    console.log('Admin:', process.env.ADMIN_EMAIL || 'admin@canalinformatique.ma', '/', process.env.ADMIN_PASSWORD || 'Admin@123456');
    console.log('HR Manager: hr@canalinformatique.ma / Hr@123456');
    console.log('Employee: employee@canalinformatique.ma / Employee@123');
    process.exit(0);
  } catch (error) {
    console.error('Seed error:', error);
    process.exit(1);
  }
};

seed();
