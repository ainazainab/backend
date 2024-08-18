import { Model, DataTypes, Optional } from 'sequelize';
import { sequelize } from './index'; 
import User from './user';

interface PrivateRoomAttributes {
  id: number;
  user1Id: number;
  user2Id: number;
}

interface PrivateRoomCreationAttributes extends Optional<PrivateRoomAttributes, 'id'> {}

class PrivateRoom extends Model<PrivateRoomAttributes, PrivateRoomCreationAttributes> implements PrivateRoomAttributes {
  public id!: number;
  public user1Id!: number;
  public user2Id!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

PrivateRoom.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  user1Id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  user2Id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  sequelize,
  tableName: 'PrivateRooms',
  timestamps: true,
  underscored: true,
});

PrivateRoom.belongsTo(User, { as: 'User1', foreignKey: 'user1Id' });
PrivateRoom.belongsTo(User, { as: 'User2', foreignKey: 'user2Id' });

export default PrivateRoom;
