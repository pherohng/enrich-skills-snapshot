import { createAvatar } from '@dicebear/avatars';
import * as jdenticonStyle from '@dicebear/avatars-jdenticon-sprites';

export const generateRandomAvatar = () => {
  return createAvatar(jdenticonStyle, {
    dataUri: true,
    radius: 5,
    margin: 3
  });
};
