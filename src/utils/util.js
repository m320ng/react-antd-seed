import { store } from '../index';
import { showModalAction } from '../containers/SharedComponent/shared_component.reducer';

export function confirm() {
  const dispatch = store.dispatch;
  dispatch(
    showModalAction({
      confirm: true,
      title: 'ewofjew',
      content: 'fwefewf',
      handleOk: () => {
        console.log('ok');
      },
      handleCancel: () => {
        console.log('cancel');
      },
    }),
  );
}
