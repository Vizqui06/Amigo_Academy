const mongoose = require('mongoose');
require('dotenv').config({ path: '.env.local' });

// Esquema de Course
const LessonSchema = new mongoose.Schema({
  title: String,
  description: String,
  type: { type: String, enum: ['video', 'text', 'quiz'] },
  content: {
    videoUrl: String,
    textContent: String,
    embedCode: String,
  },
  duration: Number,
  order: Number,
});

const CourseSchema = new mongoose.Schema({
  title: String,
  description: String,
  category: String,
  imageUrl: String,
  lessons: [LessonSchema],
  instructor: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  isPublished: Boolean,
  enrollmentCount: Number,
  resources: [{
    title: String,
    url: String,
    type: String,
  }],
}, { timestamps: true });

const Course = mongoose.models.Course || mongoose.model('Course', CourseSchema);

const sampleCourses = [
  {
    title: 'Differential Calculus',
    description: 'Master the fundamentals of differential calculus, including limits, derivatives, and their applications in real-world problems.',
    category: 'Math',
    isPublished: true,
    enrollmentCount: 127,
    lessons: [
      {
        title: 'Introduction to Limits',
        description: 'Understanding the concept of limits and their importance',
        type: 'video',
        content: { videoUrl: 'https://www.youtube.com/watch?v=YNstP0ESndU' },
        duration: 15,
        order: 1,
      },
      {
        title: 'Basic Derivatives',
        description: 'Learn the fundamental rules of differentiation',
        type: 'video',
        content: { videoUrl: 'https://www.youtube.com/watch?v=5yfh5cf4-0w' },
        duration: 20,
        order: 2,
      },
      {
        title: 'Chain Rule',
        description: 'Master the chain rule for composite functions',
        type: 'video',
        content: { videoUrl: 'https://www.youtube.com/watch?v=HfACrKJ_Y2w' },
        duration: 18,
        order: 3,
      },
    ],
    resources: [
      { title: 'Khan Academy - Calculus', url: 'https://www.khanacademy.org/math/calculus-1', type: 'external' },
      { title: 'Paul\'s Online Notes', url: 'https://tutorial.math.lamar.edu/', type: 'external' },
    ]
  },
  {
    title: 'Integral Calculus',
    description: 'Explore integration techniques, definite and indefinite integrals, and their applications in finding areas and volumes.',
    category: 'Math',
    isPublished: true,
    enrollmentCount: 98,
    lessons: [
      {
        title: 'Introduction to Integration',
        type: 'video',
        content: { videoUrl: 'https://www.youtube.com/watch?v=rfG8ce4nNh0' },
        duration: 16,
        order: 1,
      },
      {
        title: 'Integration Techniques',
        type: 'video',
        content: { videoUrl: 'https://www.youtube.com/watch?v=H9eCT6f_Ftw' },
        duration: 22,
        order: 2,
      },
    ]
  },
  {
    title: 'Linear Algebra Fundamentals',
    description: 'Learn vectors, matrices, determinants, and systems of linear equations essential for advanced mathematics and data science.',
    category: 'Math',
    isPublished: true,
    enrollmentCount: 156,
    lessons: [
      {
        title: 'Vectors and Vector Spaces',
        type: 'video',
        content: { videoUrl: 'https://www.youtube.com/watch?v=fNk_zzaMoSs' },
        duration: 20,
        order: 1,
      },
      {
        title: 'Matrix Operations',
        type: 'video',
        content: { videoUrl: 'https://www.youtube.com/watch?v=kYB8IZa5AuE' },
        duration: 25,
        order: 2,
      },
    ]
  },
  {
    title: 'Full Stack Web Development',
    description: 'Build modern web applications from scratch using React, Node.js, MongoDB, and deploy to production environments.',
    category: 'Programming',
    isPublished: true,
    enrollmentCount: 243,
    lessons: [
      {
        title: 'HTML & CSS Basics',
        type: 'video',
        content: { videoUrl: 'https://www.youtube.com/watch?v=G3e-cpL7ofc' },
        duration: 30,
        order: 1,
      },
      {
        title: 'JavaScript Fundamentals',
        type: 'video',
        content: { videoUrl: 'https://www.youtube.com/watch?v=W6NZfCO5SIk' },
        duration: 45,
        order: 2,
      },
      {
        title: 'React Components',
        type: 'video',
        content: { videoUrl: 'https://www.youtube.com/watch?v=Ke90Tje7VS0' },
        duration: 40,
        order: 3,
      },
    ]
  },
  {
    title: 'Database Design & SQL',
    description: 'Master relational database concepts, SQL queries, normalization, and database optimization for enterprise applications.',
    category: 'Programming',
    isPublished: true,
    enrollmentCount: 189,
    lessons: [
      {
        title: 'Introduction to Databases',
        type: 'video',
        content: { videoUrl: 'https://www.youtube.com/watch?v=wR0jg0eQsZA' },
        duration: 18,
        order: 1,
      },
      {
        title: 'SQL Queries',
        type: 'video',
        content: { videoUrl: 'https://www.youtube.com/watch?v=7S_tz1z_5bA' },
        duration: 35,
        order: 2,
      },
    ]
  },
  {
    title: 'Modern Architecture & Design',
    description: 'Learn architectural principles, sustainable design, building codes, and use professional CAD software for creating blueprints.',
    category: 'Engineering',
    isPublished: true,
    enrollmentCount: 87,
    lessons: [
      {
        title: 'Architectural Principles',
        type: 'video',
        content: { videoUrl: 'https://www.youtube.com/watch?v=VZXIbc0MZfc' },
        duration: 25,
        order: 1,
      },
      {
        title: 'CAD Software Basics',
        type: 'video',
        content: { videoUrl: 'https://www.youtube.com/watch?v=1pKGfVxsFFg' },
        duration: 30,
        order: 2,
      },
    ]
  },
];

async function seedCourses() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected successfully!');

    // Limpiar cursos existentes
    await Course.deleteMany({});
    console.log('Cleared existing courses');

    // Insertar nuevos cursos
    const inserted = await Course.insertMany(sampleCourses);
    console.log(`Successfully seeded ${inserted.length} courses!`);

    // Mostrar resumen
    console.log('\nCourses by category:');
    const categories = [...new Set(sampleCourses.map(c => c.category))];
    categories.forEach(cat => {
      const count = sampleCourses.filter(c => c.category === cat).length;
      console.log(`  ${cat}: ${count} courses`);
    });

    await mongoose.disconnect();
    console.log('\nDisconnected from database');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding courses:', error);
    process.exit(1);
  }
}

seedCourses();