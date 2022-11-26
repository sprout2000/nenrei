import { render } from '@testing-library/react';
import { SideBar } from '../SideBar';

test('render SideBar component', async () => {
  render(
    <SideBar
      drawerOpen={true}
      onQROpen={() => vi.fn()}
      toggleDrawer={() => vi.fn()}
    />
  );
});
