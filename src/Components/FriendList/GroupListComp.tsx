/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
import { useEffect, useState } from 'react';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SearchIcon from '@mui/icons-material/Search';
import { IconButton } from '@mui/material/';
import './GroupListComp.css';
import { set, ref as dbref, get, child } from 'firebase/database';
import { doc, getDoc, updateDoc, arrayUnion } from '@firebase/firestore';
import { nanoid } from 'nanoid';
import { PlusOutlined } from '@ant-design/icons';
import { CheckboxValueType } from 'antd/lib/checkbox/Group';
import Friend from '../Friend/Friend';
import db from '../../Services/UserService';
import { useAuth } from '../../store/AuthContext';
import CreateGroup from '../CreateGroup/CreateGroup';
import realtimeDb from '../../Services/DatabaseService';
import { Group, fetchGroups } from '../../store/redux/reducers/GroupSlice';
import { useAppDispatch, useAppSelector } from '../../store/redux/hooks';

type ConnectedGroupsListComponent = {
  groupItemList: Object[];
  onGroupItemClick: Function;
  selectedGroupId: string;
};

type FriendListProps = {
  handleGroupClick: Function;
  selectedGroupData: Group;
};
export default function GroupListComp(props: FriendListProps) {
  const { user } = useAuth();
  const { handleGroupClick, selectedGroupData } = props;
  const [isModalVisible, setisModalVisible] = useState(false);
  // const [groupList, setGroupList] = useState<Object[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [isGroupCreated, setisGroupCreated] = useState<boolean>(false);
  const groupList = useAppSelector((state) => state.groups.groupList);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchGroups(user.uid));
    setisGroupCreated(false);
  }, [user]);

  const handleGroupCreation = async (
    groupName: string,
    selectedUsers: CheckboxValueType[],
    groupImage: string,
  ) => {
    const GroupId = nanoid();
    const dbRef = dbref(realtimeDb, `groups/${GroupId}`);
    const groupMembers = selectedUsers.map((id) => {
      return id.toString();
    });
    set(dbRef, {
      groupId: GroupId,
      name: groupName,
      members: [user.uid, ...groupMembers],
      imageUrl: groupImage,
    });
    // selectedUsers.map((member) => {
    //   set(dbRef, {
    //     groupId: GroupId,
    //     name: groupName,
    //     members: arrayUnion(member),
    //   });
    // });

    // } else {
    //   const selectedUserName = friendList.filter((friend: any) => {
    //     if (friend.uid === selectedUser || friend.uid === user.uid) {
    //       return friend.name;
    //     }
    //   });
    //   const GroupName = `${selectedUserName[0].name}-${selectedUserName[1].name}`;
    //   const dbRef = dbref(realtimeDb, `groups/${GroupId}`);
    //   set(dbRef, {
    //     groupId: GroupId,
    //     name: GroupName,
    //     members: [user.uid, selectedUser],
    //   });
    //   setisGroupCreated(true);
    // }

    const userUpdateRef = doc(db, 'users', user.uid);
    await updateDoc(userUpdateRef, {
      groups: arrayUnion(GroupId),
    });

    selectedUsers.map(async (id) => {
      const updateRef = doc(db, 'users', id.toString());
      await updateDoc(updateRef, {
        groups: arrayUnion(GroupId),
      });
    });

    setisGroupCreated(true);
    setisModalVisible(false);
  };

  const handleCancel = () => {
    setisModalVisible(false);
  };

  const renderCreateGroup = () => {
    return (
      <CreateGroup
        isVisible={isModalVisible}
        onCancel={handleCancel}
        onSave={handleGroupCreation}
      />
    );
  };

  const fetchSearchedGroup = (Term: string) => {
    return Term === ''
      ? groupList
      : groupList.filter((group: any) => {
          return group && group.name.toLowerCase().includes(Term);
        });
  };

  const renderGroupList = () => {
    const groupListItems = fetchSearchedGroup(searchTerm);
    if (groupListItems && groupListItems.length < 0) {
      return null;
    }
    return (
      <div className="friendlist_friends">
        {groupListItems.map((groupData: any) => {
          const { groupId } = groupData;
          const isSelected =
            groupId &&
            groupId === selectedGroupData &&
            selectedGroupData.groupId;
          return (
            <Friend
              groupData={groupData}
              handleClick={handleGroupClick}
              isSelected={isSelected}
            />
          );
        })}
      </div>
    );
  };
  return (
    <div className="friendlist">
      <div className="friendlist_Items">
        <div className="friendlist_header">
          <span>Chats</span>
          <IconButton>
            <NotificationsIcon />
          </IconButton>
          {renderCreateGroup()}
        </div>
        <div className="friendlist_search">
          <div className="search_container">
            <SearchIcon />
            <input
              type="text"
              placeholder="Search user and Groups"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        {renderGroupList()}
        <div className="friendlist_creategroup">
          <button
            type="button"
            className="btn btn-light btn-sm"
            onClick={() => {
              setisModalVisible(true);
            }}
          >
            {' '}
            <p>
              <PlusOutlined />
            </p>
            <span>Create Group</span>
          </button>
        </div>
      </div>
    </div>
  );
}
