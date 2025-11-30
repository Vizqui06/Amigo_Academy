const mongoose = require('mongoose');
require('dotenv').config({ path: '.env.local' });

async function testConnection() {
  console.log('====================================');
  console.log('MONGODB CONNECTION TEST');
  console.log('====================================\n');

  // Verificar que existe MONGODB_URI
  if (!process.env.MONGODB_URI) {
    console.error('❌ ERROR: MONGODB_URI no está definida en .env.local');
    console.log('\nVerifica que:');
    console.log('1. El archivo .env.local existe en la raíz del proyecto');
    console.log('2. Contiene la línea: MONGODB_URI=mongodb+srv://...');
    process.exit(1);
  }

  console.log('✅ MONGODB_URI encontrada');
  console.log('📝 URI (parcial):', process.env.MONGODB_URI.substring(0, 30) + '...\n');

  try {
    console.log('🔄 Intentando conectar a MongoDB...\n');
    
    await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
    });

    console.log('✅ ¡CONEXIÓN EXITOSA!\n');

    // Obtener información de la base de datos
    const db = mongoose.connection.db;
    const collections = await db.listCollections().toArray();

    console.log('📊 Base de datos:', db.databaseName);
    console.log('📁 Colecciones encontradas:', collections.length);
    
    if (collections.length > 0) {
      console.log('\nColecciones:');
      for (const collection of collections) {
        const count = await db.collection(collection.name).countDocuments();
        console.log(`  - ${collection.name}: ${count} documentos`);
      }
    } else {
      console.log('  (No hay colecciones todavía - esto es normal en una base de datos nueva)');
    }

    await mongoose.disconnect();
    console.log('\n✅ Prueba completada exitosamente');
    process.exit(0);

  } catch (error) {
    console.error('❌ ERROR AL CONECTAR:\n');
    
    if (error.message.includes('ENOTFOUND')) {
      console.error('El servidor MongoDB no se encuentra.');
      console.error('Verifica que la URI sea correcta.');
    } else if (error.message.includes('Authentication failed')) {
      console.error('Autenticación fallida.');
      console.error('Verifica que el usuario y contraseña sean correctos.');
    } else if (error.message.includes('IP')) {
      console.error('Tu IP no está autorizada.');
      console.error('Ve a MongoDB Atlas > Network Access y agrega 0.0.0.0/0');
    } else {
      console.error('Error:', error.message);
    }
    
    console.error('\n📝 Error completo:', error);
    process.exit(1);
  }
}

testConnection();