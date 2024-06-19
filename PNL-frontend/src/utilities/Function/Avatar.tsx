import { createAvatar } from '@dicebear/core';
import { initials } from '@dicebear/collection';

export const CreateAvatar = (name: string) => {
    return createAvatar(initials, {
        seed: name,
        radius: 50,
        backgroundType: ['solid']
    }).toDataUriSync();
}
