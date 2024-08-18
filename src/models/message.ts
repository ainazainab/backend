import { Model, DataTypes, Optional } from 'sequelize';
import { sequelize } from './index'; 
import User from './user';


interface MessageAttributes {
  id: number;
  privateRoomId: number;
  senderId: number;
  receiverId: number;
  text: string;
}

interface MessageCreationAttributes extends Optional<MessageAttributes, 'id'> {}

class Message extends Model<MessageAttributes, MessageCreationAttributes> implements MessageAttributes {
  public id!: number;
  public privateRoomId!: number;
  public senderId!: number;
  public receiverId!: number;
  public text!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Message.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  privateRoomId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  senderId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  receiverId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  text: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
}, {
  sequelize,
  tableName: 'Messages',
  timestamps: true,
  underscored: true,
});

Message.belongsTo(PrivateRoom, { foreignKey: 'privateRoomId' });
Message.belongsTo(User, { as: 'Sender', foreignKey: 'senderId' });
Message.belongsTo(User, { as: 'Receiver', foreignKey: 'receiverId' });

export default Message;
