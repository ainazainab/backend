const db = require('./models') as {
  User: any;
  Message: any;
  PrivateRoom: any;
  sequelize: any;
};

const { User, Message, PrivateRoom } = db;

(async () => {
  try {
    // Sync models with the database
    await db.sequelize.sync({ alter: true });
    console.log('Models have been synced with the database.');

    await db.sequelize.authenticate();
    console.log('Connection has been established successfully.');

    // Your test logic here
    const newUser = await User.create({
      email: 'user@example.com',
      username: 'user123',
      display_name: 'User 123',
      password: 'hashedPassword123',
    });

    const anotherUserId = 2;

    const newRoom = await PrivateRoom.create({
      user1Id: newUser.id,
      user2Id: anotherUserId,
    });

    const newMessage = await Message.create({
      privateRoomId: newRoom.id,
      senderId: newUser.id,
      receiverId: anotherUserId,
      text: 'Hello!',
    });

    const messages = await Message.findAll({
      where: { privateRoomId: newRoom.id },
      include: [{ model: User, as: 'Sender' }, { model: User, as: 'Receiver' }],
    });

    console.log('Messages:', messages);

  } catch (error) {
    console.error('Error:', error);
  } finally {
    await db.sequelize.close();
  }
})();
