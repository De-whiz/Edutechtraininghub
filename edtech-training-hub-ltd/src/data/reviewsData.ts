import { ReviewItem } from '../types';

const d = (iso: string) => new Date(iso).getTime();

export const seedReviews: ReviewItem[] = [
  {
    id: 'seed-1',
    userId: 'seed-adeola',
    courseId: 'masterclass',
    userName: 'Adeola Bankole',
    rating: 5,
    comment:
      'The masterclass completely changed how I deliver lessons online. Practical sessions and the WhatsApp community support made all the difference.',
    date: d('2025-08-15'),
  },
  {
    id: 'seed-2',
    userId: 'seed-emeka',
    courseId: 'masterclass',
    userName: 'Emeka Nwosu',
    rating: 5,
    comment:
      'Value for money. I set up my first online class within two weeks of completing the programme.',
    date: d('2025-08-28'),
  },
  {
    id: 'seed-3',
    userId: 'seed-fatima',
    courseId: 'masterclass',
    userName: 'Fatima Suleiman',
    rating: 4,
    comment:
      'Rich content and great facilitators. I only wish the cohort timings were more flexible for part-time learners.',
    date: d('2025-09-02'),
  },
  {
    id: 'seed-4',
    userId: 'seed-chinedu',
    courseId: 'id-fundamentals',
    userName: 'Chinedu Okafor',
    rating: 5,
    comment:
      'Finally understood how to structure lessons properly. The templates were immediately useful in my school.',
    date: d('2025-07-20'),
  },
  {
    id: 'seed-5',
    userId: 'seed-aisha',
    courseId: 'id-fundamentals',
    userName: 'Aisha Bello',
    rating: 4,
    comment:
      'Clear explanations and actionable assignments. A solid foundation for anyone starting instructional design.',
    date: d('2025-08-09'),
  },
  {
    id: 'seed-6',
    userId: 'seed-tunde',
    courseId: 'id-fundamentals',
    userName: 'Tunde Adeyemi',
    rating: 5,
    comment:
      'I now design lessons that actually engage my learners. Highly recommended.',
    date: d('2025-08-30'),
  },
  {
    id: 'seed-7',
    userId: 'seed-ngozi',
    courseId: 'ai-educators',
    userName: 'Ngozi Eze',
    rating: 5,
    comment:
      'Practical AI tools shown step by step. I use them to plan lessons and mark assignments quickly now.',
    date: d('2025-07-12'),
  },
  {
    id: 'seed-8',
    userId: 'seed-samuel',
    courseId: 'ai-educators',
    userName: 'Samuel Okoro',
    rating: 5,
    comment:
      'Demystified AI for me as a teacher. Loved the real classroom examples.',
    date: d('2025-08-05'),
  },
  {
    id: 'seed-9',
    userId: 'seed-blessing',
    courseId: 'ai-educators',
    userName: 'Blessing Adebayo',
    rating: 4,
    comment:
      'Great course, though a few tools required internet which was costly on my network. Content itself was excellent.',
    date: d('2025-08-18'),
  },
  {
    id: 'seed-10',
    userId: 'seed-ibrahim',
    courseId: 'lms-course-creators',
    userName: 'Ibrahim Musa',
    rating: 5,
    comment:
      'Guided me from zero to a published course on Moodle. Very hands-on and practical.',
    date: d('2025-07-25'),
  },
  {
    id: 'seed-11',
    userId: 'seed-gift',
    courseId: 'lms-course-creators',
    userName: 'Gift Chinwe',
    rating: 4,
    comment:
      'Solid walkthrough of setting up and managing courses. A few sections moved fast but the replay helped.',
    date: d('2025-08-21'),
  },
  {
    id: 'seed-12',
    userId: 'seed-michael',
    courseId: 'lms-course-creators',
    userName: 'Michael Ajayi',
    rating: 4,
    comment:
      'Good practical coverage of grading, enrolments and student communication.',
    date: d('2025-09-04'),
  },
  {
    id: 'seed-13',
    userId: 'seed-kemi',
    courseId: 'digital-skills-teachers',
    userName: 'Kemi Oladipo',
    rating: 5,
    comment:
      'Exactly what our school needed. I use Canva, Google Forms and Zoom confidently in class now.',
    date: d('2025-07-08'),
  },
  {
    id: 'seed-14',
    userId: 'seed-uche',
    courseId: 'digital-skills-teachers',
    userName: 'Uche Nwankwo',
    rating: 5,
    comment:
      'Friendly pace, patient facilitators. I recommended it to my whole department.',
    date: d('2025-08-12'),
  },
  {
    id: 'seed-15',
    userId: 'seed-ronke',
    courseId: 'digital-skills-teachers',
    userName: 'Ronke Alabi',
    rating: 4,
    comment:
      'Really practical and time-efficient for a working teacher.',
    date: d('2025-08-26'),
  },
  {
    id: 'seed-16',
    userId: 'seed-yusuf',
    courseId: 'elearning-content-dev',
    userName: 'Yusuf Ibrahim',
    rating: 5,
    comment:
      'Learned how to build engaging multimedia lessons end to end. Fantastic mentor feedback on my project.',
    date: d('2025-07-29'),
  },
  {
    id: 'seed-17',
    userId: 'seed-halima',
    courseId: 'elearning-content-dev',
    userName: 'Halima Gusau',
    rating: 4,
    comment:
      'Great depth on scripting and storyboarding. Covers more than the average course.',
    date: d('2025-08-22'),
  },
  {
    id: 'seed-18',
    userId: 'seed-chiamaka',
    courseId: 'elearning-content-dev',
    userName: 'Chiamaka Obi',
    rating: 5,
    comment:
      'I produced my first full eLearning module within a month. Worth every naira.',
    date: d('2025-09-01'),
  },
  {
    id: 'seed-19',
    userId: 'seed-john',
    courseId: 'online-tutoring-support',
    userName: 'John Adewale',
    rating: 4,
    comment:
      'Excellent strategies for keeping students engaged one-on-one online. Practical and relatable.',
    date: d('2025-07-15'),
  },
  {
    id: 'seed-20',
    userId: 'seed-amaka',
    courseId: 'online-tutoring-support',
    userName: 'Amaka Nnaji',
    rating: 5,
    comment:
      'The techniques for learner support changed how I handle struggling students. Highly recommended.',
    date: d('2025-08-19'),
  },
  {
    id: 'seed-21',
    userId: 'seed-dapo',
    courseId: 'online-tutoring-support',
    userName: 'Dapo Ogunleye',
    rating: 5,
    comment:
      'Clear, practical and full of real examples from tutoring sessions in Nigeria.',
    date: d('2025-09-03'),
  },
  {
    id: 'seed-22',
    userId: 'seed-lola',
    courseId: 'digital-product-creation',
    userName: 'Lola Osun',
    rating: 5,
    comment:
      'I packaged my knowledge into my first digital product and started selling. The roadmap was crystal clear.',
    date: d('2025-07-18'),
  },
  {
    id: 'seed-23',
    userId: 'seed-kenny',
    courseId: 'digital-product-creation',
    userName: 'Kenny Eze',
    rating: 5,
    comment:
      'Brilliant for creators and consultants. Covers pricing, marketing and delivery.',
    date: d('2025-08-14'),
  },
  {
    id: 'seed-24',
    userId: 'seed-temidayo',
    courseId: 'digital-product-creation',
    userName: 'Temidayo Fashola',
    rating: 4,
    comment:
      'Strong content. Would love a deeper dive into ads, but the organic marketing section was excellent.',
    date: d('2025-08-29'),
  },
  {
    id: 'seed-25',
    userId: 'seed-obiora',
    courseId: 'advanced-instructional-design',
    userName: 'Obiora Ugwu',
    rating: 5,
    comment:
      'A masterclass in course design. The alignment of objectives, activities and assessment finally clicked.',
    date: d('2025-08-02'),
  },
  {
    id: 'seed-26',
    userId: 'seed-funke',
    courseId: 'advanced-instructional-design',
    userName: 'Funke Adeyemi',
    rating: 5,
    comment:
      'Best advanced course I have taken. The case studies from real institutions were invaluable.',
    date: d('2025-08-25'),
  },
  {
    id: 'seed-27',
    userId: 'seed-ekene',
    courseId: 'advanced-instructional-design',
    userName: 'Ekene Odoh',
    rating: 4,
    comment:
      'Excellent depth. Just be ready for the workload — it is intense but rewarding.',
    date: d('2025-09-06'),
  },
  {
    id: 'seed-28',
    userId: 'seed-zainab',
    courseId: 'ai-powered-content-creation',
    userName: 'Zainab Kareem',
    rating: 5,
    comment:
      'This is the future. I generate lesson materials, quizzes and images in minutes now.',
    date: d('2025-07-22'),
  },
  {
    id: 'seed-29',
    userId: 'seed-oyindamola',
    courseId: 'ai-powered-content-creation',
    userName: 'Oyindamola Bakare',
    rating: 4,
    comment:
      'Practical prompt patterns and workflow tips. Some tools had free-tier limits but the guidance on alternatives helps.',
    date: d('2025-08-20'),
  },
  {
    id: 'seed-30',
    userId: 'seed-ebuka',
    courseId: 'ai-powered-content-creation',
    userName: 'Ebuka Nnamdi',
    rating: 3,
    comment:
      'Good intro to AI content tools, though I expected more advanced prompt engineering. Still very useful.',
    date: d('2025-09-05'),
  },
  {
    id: 'seed-31',
    userId: 'seed-adebisi',
    courseId: 'digital-productivity-professionals',
    userName: 'Adebisi Johnson',
    rating: 4,
    comment:
      'Practical productivity systems for busy professionals. I reclaimed hours every week with the workflows.',
    date: d('2025-07-16'),
  },
  {
    id: 'seed-32',
    userId: 'seed-nkem',
    courseId: 'digital-productivity-professionals',
    userName: 'Nkem Anozie',
    rating: 5,
    comment:
      'The task management and email workflows alone were worth the fee. Highly practical.',
    date: d('2025-08-11'),
  },
  {
    id: 'seed-33',
    userId: 'seed-olatunji',
    courseId: 'digital-productivity-professionals',
    userName: 'Olatunji Lawal',
    rating: 4,
    comment:
      'Great tools and templates. Easy to follow at your own pace.',
    date: d('2025-08-24'),
  },
  {
    id: 'seed-34',
    userId: 'seed-adanna',
    courseId: 'video-course-production',
    userName: 'Adanna Onyeka',
    rating: 5,
    comment:
      'Recorded, edited and published my first video course. The production templates are gold.',
    date: d('2025-07-30'),
  },
  {
    id: 'seed-35',
    userId: 'seed-iseoluwapo',
    courseId: 'video-course-production',
    userName: 'Iseoluwapo Ade',
    rating: 5,
    comment:
      'Professional coaching all the way. My videos finally look and sound the way I imagined.',
    date: d('2025-08-17'),
  },
  {
    id: 'seed-36',
    userId: 'seed-david',
    courseId: 'video-course-production',
    userName: 'David Ejiroghene',
    rating: 4,
    comment:
      'Comprehensive course. Strong on lighting and audio, which most courses ignore.',
    date: d('2025-09-07'),
  },
  {
    id: 'seed-37',
    userId: 'seed-omoruyi',
    courseId: 'lms-administration-mgmt',
    userName: 'Omoruyi Osa',
    rating: 5,
    comment:
      'I now run our institution LMS confidently — user management, reports and troubleshooting included.',
    date: d('2025-07-27'),
  },
  {
    id: 'seed-38',
    userId: 'seed-bukunmi',
    courseId: 'lms-administration-mgmt',
    userName: 'Bukunmi Ogunbiyi',
    rating: 4,
    comment:
      'Very thorough for administrators. Saved us from expensive external consultants.',
    date: d('2025-08-23'),
  },
  {
    id: 'seed-39',
    userId: 'seed-ndubuisi',
    courseId: 'lms-administration-mgmt',
    userName: 'Ndubuisi Anya',
    rating: 5,
    comment:
      'Everything you need to administer an LMS effectively. Excellent support from the facilitators too.',
    date: d('2025-09-08'),
  },
];