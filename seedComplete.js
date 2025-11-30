const mongoose = require('mongoose');
require('dotenv').config({ path: '.env.local' });

// Esquemas
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

const courses = [
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
    ]
  },
];

async function seed() {
  console.log('====================================');
  console.log('SEEDING DATABASE');
  console.log('====================================\n');

  try {
    // Verificar MONGODB_URI
    if (!process.env.MONGODB_URI) {
      throw new Error('MONGODB_URI no está definida en .env.local');
    }

    console.log('🔄 Conectando a MongoDB...\n');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Conectado a MongoDB\n');

    // Limpiar cursos existentes
    console.log('🗑️  Limpiando cursos existentes...');
    await Course.deleteMany({});
    console.log('✅ Cursos limpiados\n');

    // Insertar nuevos cursos
    console.log('📚 Insertando cursos...');
    const inserted = await Course.insertMany(courses);
    console.log(`✅ ${inserted.length} cursos insertados exitosamente\n`);

    // Mostrar resumen
    console.log('📊 RESUMEN:');
    const categories = [...new Set(courses.map(c => c.category))];
    categories.forEach(cat => {
      const count = courses.filter(c => c.category === cat).length;
      console.log(`  ${cat}: ${count} cursos`);
    });

    console.log('\n✅ SEED COMPLETADO EXITOSAMENTE');
    
    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error('❌ ERROR:', error.message);
    console.error('\nDetalles:', error);
    process.exit(1);
  }
}

seed();