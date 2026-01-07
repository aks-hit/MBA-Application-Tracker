export const generateTestApplications = () => {
  const today = new Date();
  const d = (days) =>
    new Date(today.getTime() + days * 86400000)
      .toISOString()
      .slice(0, 10);

  return [
    {
      id: 1,
      instituteName: 'IIM Ahmedabad',
      instituteType: 'IIM',
      applicationDeadline: d(-2), // overdue
      applicationFilled: false,
      shortlisted: false,
      piRegistrationDeadline: '',
      result: '',
      finalShortlisted: false,
      feeDeadline: '',
      feePaid: false,
      notes: 'Overdue test'
    },
    {
      id: 2,
      instituteName: 'IIM Bangalore',
      instituteType: 'IIM',
      applicationDeadline: d(2), // critical
      applicationFilled: false,
      shortlisted: false,
      piRegistrationDeadline: '',
      result: '',
      finalShortlisted: false,
      feeDeadline: '',
      feePaid: false,
      notes: 'Critical deadline test'
    },
    {
      id: 3,
      instituteName: 'IIM Calcutta',
      instituteType: 'IIM',
      applicationDeadline: d(10),
      applicationFilled: true,
      shortlisted: true,
      piRegistrationDeadline: d(3),
      result: '',
      finalShortlisted: false,
      feeDeadline: '',
      feePaid: false,
      notes: 'PI pending'
    },
    {
      id: 4,
      instituteName: 'IIM Lucknow',
      instituteType: 'IIM',
      applicationDeadline: d(15),
      applicationFilled: true,
      shortlisted: true,
      piRegistrationDeadline: d(-1),
      result: 'Waitlisted',
      finalShortlisted: false,
      feeDeadline: '',
      feePaid: false,
      notes: 'Waitlist test'
    },
    {
      id: 5,
      instituteName: 'IIM Kozhikode',
      instituteType: 'IIM',
      applicationDeadline: d(20),
      applicationFilled: true,
      shortlisted: true,
      piRegistrationDeadline: d(-5),
      result: 'Selected',
      finalShortlisted: true,
      feeDeadline: d(1),
      feePaid: false,
      notes: 'Fee deadline test'
    },
    {
      id: 6,
      instituteName: 'IIM Indore',
      instituteType: 'IIM',
      applicationDeadline: d(30),
      applicationFilled: true,
      shortlisted: true,
      piRegistrationDeadline: d(-10),
      result: 'Selected',
      finalShortlisted: true,
      feeDeadline: d(-2),
      feePaid: true,
      notes: 'Completed admission'
    }
  ];
};
