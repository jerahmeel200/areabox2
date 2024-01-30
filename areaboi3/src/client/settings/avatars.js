export const gAvatars = {
  africa: '01-a.svg',
  africa_glasses: '01-b.svg',
  africa_girl: '01-c.svg',
  africa_speaks: '02-a.svg',
  africa_glasses_speaks: '02-b.svg',
  africa_girl_speaks: '02-c.svg',
  ocean: '03-a.svg',
  red_rose_girl: '03-b.svg',
  nordic: '04-a.svg',
  nordic_speaks: '04-b.svg',
  nordic_girl: '04-c.svg',
  tuga: '05-a.svg',
  tuga_glasses: '05-b.svg',
  tuga_girl: '05-c.svg'
};

export const gDefaultAvatar = 2; //"africa"

const avatars_path = 'static/img/pins_svg/';

export const getAvatarUrl = function (avatar) {
  return (
    avatars_path +
    (gAvatars[avatar] ? gAvatars[avatar] : gAvatars[gDefaultAvatar])
  );
};
