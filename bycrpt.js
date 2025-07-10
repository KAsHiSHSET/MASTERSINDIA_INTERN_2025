const bcrypt = require('bcryptjs');

async function testBcrypt() {
  const password = 'MySecret123!';
  const saltRounds = 10;

  const hashedPassword = bcrypt.hashSync(password, saltRounds);
  console.log('✅ Hashed password:', hashedPassword);

  const isMatch = bcrypt.compareSync(password, hashedPassword);
  console.log(isMatch ? '✅ Password matched!' : '❌ Password mismatch!');
}

testBcrypt();
