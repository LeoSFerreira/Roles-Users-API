const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db.sqlite');
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');
const { faker } = require('@faker-js/faker');

db.serialize(() => {
  const roles = [
    {
      id: '08327399-a395-49c9-a443-7f3064147b3c',
      name: 'T.I.',
      created_at: '2023-09-03 18:28:15'
    },
    {
      id: uuidv4(),
      name: 'Usuário Comum',
      created_at: new Date().toISOString()
    }
  ];

  roles.forEach(role => {
    db.run(
      `INSERT OR IGNORE INTO roles (id, name, created_at) VALUES (?, ?, ?)`,
      [role.id, role.name, role.created_at]
    );
  });

  const saltRounds = 10;
  const roleId = '08327399-a395-49c9-a443-7f3064147b3c'; // ID da role T.I.
  let count = 0;

  for (let i = 0; i < 1000; i++) {
    const userId = uuidv4();
    const name = faker.person.fullName();
    const email = `user${i}_${faker.internet.email()}`;
    const password = bcrypt.hashSync('senha123', saltRounds);
    const isAdmin = i % 5 === 0 ? 1 : 0;
    const createdAt = faker.date.past().toISOString();

    db.run(
      `INSERT INTO users (id, name, email, password, avatar, isAdmin, created_at, roleId)
       VALUES (?, ?, ?, ?, NULL, ?, ?, ?)`,
      [userId, name, email, password, isAdmin, createdAt, roleId],
      (err) => {
        if (err) {
          console.error(`Erro ao inserir o usuário ${i}:`, err.message);
        }

        count++;
        if (count === 1000) {
          console.log('Todos os usuários foram inseridos!');
          db.close();
        }
      }
    );
  }
});
