import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Course from '@/models/Course';

export async function GET(req, { params }) {
  try {
    await connectDB();
    
    // El 'params.id' viene de la URL (ej: /api/courses/12345)
    const course = await Course.findById(params.id)
      .populate('instructor', 'name email image');
    
    if (!course) {
      return NextResponse.json(
        { success: false, error: 'Course not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ success: true, course }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}