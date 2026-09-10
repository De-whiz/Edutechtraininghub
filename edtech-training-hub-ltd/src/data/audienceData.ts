import { AudienceItem } from '../types';

export const homeAudienceGroups = [
  {
    id: 'educators',
    title: 'Educators & Teachers',
    desc: 'Teachers who want to develop their digital skills, teach online and create engaging learning experiences.',
    icon: 'GraduationCap',
  },
  {
    id: 'tutors',
    title: 'Online Tutors',
    desc: 'Tutors who want to improve their online teaching skills, attract learners and build sustainable tutoring opportunities.',
    icon: 'Video',
  },
  {
    id: 'trainers',
    title: 'Trainers & Facilitators',
    desc: 'Professionals who deliver workshops, training programmes and professional development.',
    icon: 'Presentation',
  },
  {
    id: 'coaches',
    title: 'Coaches & Consultants',
    desc: 'Experts who want to package their knowledge into coaching programmes, training or digital learning experiences.',
    icon: 'Award',
  },
  {
    id: 'knowledge-professionals',
    title: 'Knowledge Professionals & Subject-Matter Experts',
    desc: 'People with valuable knowledge or expertise who want to teach, create digital products or build online learning experiences.',
    icon: 'Brain',
  },
  {
    id: 'instructional-designers',
    title: 'Instructional Designers & eLearning Professionals',
    desc: 'Professionals who want to strengthen their learning design, digital learning and EdTech skills.',
    icon: 'Compass',
  },
  {
    id: 'schools-organisations',
    title: 'Schools & Education Organisations',
    desc: 'Schools and organisations seeking digital transformation, teacher training, LMS implementation and learning technology support.',
    icon: 'Building2',
  },
  {
    id: 'entrepreneurs-creators',
    title: 'Entrepreneurs & Creators',
    desc: 'People who want to turn their knowledge, skills or experience into digital products, courses or online services.',
    icon: 'Sparkles',
  },
  {
    id: 'students-learners',
    title: 'Students & Learners',
    desc: 'Children and learners who need personalised academic support and strong foundational learning.',
    icon: 'BookOpen',
  },
];

export const allAudiencesDetailed: AudienceItem[] = [
  {
    id: 'educators',
    title: 'Educators & Teachers',
    shortDesc: 'Teachers who want to develop their digital skills, teach online and create engaging learning experiences.',
    icon: 'GraduationCap',
    needs: [
      'Overcoming digital anxiety with practical, non-intimidating tools',
      'Integrating multimedia, interactive quizzes, and AI assistance into lessons',
      'Managing blended classrooms and digital student assignments smoothly',
    ],
    howWeHelp:
      'We provide step-by-step digital skills training, teacher professional development, and practical AI literacy so educators feel confident and inspired.',
    recommendedSolutions: [
      'Digital Skills & Professional Development',
      'AI for Educators Course',
      'Teacher Professional Development Workshops',
    ],
  },
  {
    id: 'tutors',
    title: 'Online Tutors',
    shortDesc: 'Tutors who want to improve their online teaching skills, attract learners and build sustainable tutoring opportunities.',
    icon: 'Video',
    needs: [
      'Mastering interactive virtual classroom software and digital tools',
      'Pinpointing learner bottlenecks quickly through diagnostic exercises',
      'Structuring reliable lesson scheduling and client communication',
    ],
    howWeHelp:
      'We train online tutors in interactive pedagogy, virtual whiteboarding, engagement strategies, and student tracking.',
    recommendedSolutions: [
      'Online Tutoring & Academic Support Course',
      'Digital Skills & Online Teaching Masterclass',
    ],
  },
  {
    id: 'trainers',
    title: 'Trainers & Facilitators',
    shortDesc: 'Professionals who deliver workshops, training programmes and professional development.',
    icon: 'Presentation',
    needs: [
      'Engaging busy adult learners in asynchronous or live corporate workshops',
      'Designing actionable participant workbooks and assessment rubrics',
      'Measuring training transfer and learning return-on-investment',
    ],
    howWeHelp:
      'We help trainers structure interactive learning activities, storyboards, and digital facilitation techniques that make training stick.',
    recommendedSolutions: [
      'Instructional Design & eLearning',
      'Digital Productivity for Professionals',
    ],
  },
  {
    id: 'coaches',
    title: 'Coaches & Consultants',
    shortDesc: 'Experts who want to package their knowledge into coaching programmes, training or digital learning experiences.',
    icon: 'Award',
    needs: [
      'Structuring proprietary knowledge into modular, digestible lessons',
      'Avoiding the time trap of exchanging hours for fees',
      'Delivering premium learner experiences with automated workflows',
    ],
    howWeHelp:
      'We co-design your course curriculum, build companion resources, and help select the ideal LMS to host your client portal.',
    recommendedSolutions: [
      'Online Course & Digital Learning Development',
      'Digital Skills & Online Teaching Masterclass',
    ],
  },
  {
    id: 'knowledge-professionals',
    title: 'Knowledge Professionals & Subject-Matter Experts',
    shortDesc: 'People with valuable knowledge or expertise who want to teach, create digital products or build online learning experiences.',
    icon: 'Brain',
    needs: [
      'Deconstructing complex technical subject matter for beginners',
      'Creating visual explanations, diagrams, and digital study aids',
      'Positioning their knowledge in the digital education marketplace',
    ],
    howWeHelp:
      'We supply instructional design expertise, storyboarding support, and digital asset packaging so your subject matter shines.',
    recommendedSolutions: [
      'Instructional Design Fundamentals',
      'Digital Product Creation',
    ],
  },
  {
    id: 'instructional-designers',
    title: 'Instructional Designers & eLearning Professionals',
    shortDesc: 'Professionals who want to strengthen their learning design, digital learning and EdTech skills.',
    icon: 'Compass',
    needs: [
      'Advancing from basic course construction to robust learning experience design (LXD)',
      'Mastering SCORM, storyboarding, and interactive multimedia tools',
      'Integrating AI ethically into learning design workflows',
    ],
    howWeHelp:
      'We offer advanced curriculum development modules, design reviews, and modern EdTech workflow optimization.',
    recommendedSolutions: [
      'Instructional Design & eLearning',
      'Advanced Instructional Design',
      'eLearning Content Development',
    ],
  },
  {
    id: 'schools-organisations',
    title: 'Schools & Education Organisations',
    shortDesc: 'Schools and organisations seeking digital transformation, teacher training, LMS implementation and learning technology support.',
    icon: 'Building2',
    needs: [
      'Selecting, deploying, and maintaining institutional LMS platforms',
      'Upskilling faculty and staff through tailored professional development',
      'Standardizing digital curricula across faculties and departments',
    ],
    howWeHelp:
      'We provide end-to-end EdTech consultation, LMS integration, curriculum digitisation, and faculty capacity building.',
    recommendedSolutions: [
      'EdTech & LMS Solutions',
      'Teacher Professional Development Programs',
      'Institutional LMS Setup & Migration',
    ],
  },
  {
    id: 'entrepreneurs-creators',
    title: 'Entrepreneurs & Creators',
    shortDesc: 'People who want to turn their knowledge, skills or experience into digital products, courses or online services.',
    icon: 'Sparkles',
    needs: [
      'Validating course topics before spending weeks producing content',
      'Setting up seamless payment, delivery, and onboarding automation',
      'Building community-driven student engagement channels',
    ],
    howWeHelp:
      'We provide course launch blueprints, learning product packaging, and video production frameworks.',
    recommendedSolutions: [
      'Online Course & Digital Learning Development',
      'Digital Product Creation',
      'Video Course Production',
    ],
  },
  {
    id: 'students-learners',
    title: 'Students & Learners',
    shortDesc: 'Children and learners who need personalised academic support and strong foundational learning.',
    icon: 'BookOpen',
    needs: [
      'Strengthening foundational conceptual understanding without judgment',
      'Flexible, focused 1-on-1 tutoring sessions tailored to individual pace',
      'Building confidence and effective independent study routines',
    ],
    howWeHelp:
      'We match learners with empathetic, skilled educators and personalized online academic guidance that yields visible progress.',
    recommendedSolutions: [
      'Online Learning & Academic Support',
      'Personalised Academic Coaching',
    ],
  },
];
