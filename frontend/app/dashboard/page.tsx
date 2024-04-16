'use client';
import { useContext } from 'react';
import { IAuthContext } from '../Interfaces/IAuthContext';
import { AuthContext } from '../context/AuthContext';

const Dashboard = () => {
  const { userData, userId } = useContext(AuthContext) as IAuthContext;

  const loremIpsum =
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam eu elit velit. Donec eget tempor lectus. Nullam in faucibus lacus, sit amet egestas dui. Nulla tempor fringilla quam in tempus. Vestibulum nec mollis tortor. Vestibulum eget risus ac quam auctor tristique eget a felis. Aenean ut magna sem. Quisque et justo semper, volutpat elit iaculis, sagittis enim. Nunc vel erat egestas, posuere diam a, lacinia nisl. Ut pharetra felis in enim feugiat faucibus vitae ut justo. Curabitur diam justo, pharetra eget fermentum non, volutpat quis velit. Duis orci est, sodales ut sapien nec, molestie elementum dui. Mauris sem lectus, suscipit cursus nisi vitae, scelerisque dictum magna. Suspendisse sed aliquet arcu. Praesent finibus posuere nulla non luctus. Donec sodales orci in justo tempus, nec aliquam mauris venenatis. Nam non lectus non sapien pellentesque maximus. Aenean commodo sollicitudin velit, nec iaculis quam lacinia ut. Ut viverra ligula a porttitor commodo. Cras id convallis dolor. Nunc condimentum lorem id lorem posuere pellentesque. Mauris sem eros, rutrum quis euismod maximus, aliquet vel ante.  Sed nec viverra magna, vel commodo risus. Aliquam vehicula, lacus non iaculis malesuada, ex metus placerat orci, ut posuere tellus nisi tempus nunc. Maecenas facilisis ipsum dolor, a convallis nibh facilisis ut. Vivamus dignissim, risus nec volutpat facilisis, mi sapien consequat leo, nec ullamcorper turpis lectus eget metus. Aliquam venenatis orci ex, id vehicula nisl pharetra a. Praesent scelerisque lacus in neque vehicula, ac vulputate mi scelerisque. Etiam id pellentesque odio. Pellentesque aliquam augue velit. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.  Vestibulum id ligula at arcu aliquet volutpat quis eget tellus. Proin et orci arcu. Nam ex enim, porta vel arcu vitae, sodales porttitor orci. Donec efficitur lectus non mauris euismod, quis bibendum odio consectetur. Aliquam vel vehicula leo. Etiam tincidunt tellus et sagittis dictum. Fusce eu dui sollicitudin, sagittis neque eget, ultricies risus. Sed vitae erat sed risus venenatis ultricies. In at tellus quam. Aenean gravida ipsum vel ullamcorper blandit.  Suspendisse ac rutrum enim, nec dignissim leo. Nullam blandit orci tristique, rhoncus risus eu, consequat massa. Duis eu neque vitae est tincidunt lobortis id id mauris. Sed in commodo mauris. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Aliquam tempor auctor justo nec pharetra. In lectus mauris, pharetra ac pretium ac, semper at urna. Nunc tempor blandit condimentum. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. In eget iaculis nulla, auctor bibendum nulla. Sed sed dictum mi, vel pulvinar sem. ';

  console.log(userData);
  console.log(userId);
  return (
    <div className="w-full h-full p-4 sm:p-10 m-auto space-y-4 lg:grid lg:grid-cols-2 lg:space-y-0 lg:gap-4 xl:grid-cols-3 max-w-screen-2xl">
      Dashboard
    </div>
  );
};

export default Dashboard;
