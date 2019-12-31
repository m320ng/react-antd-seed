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

export function camelize(str) {
  return str
    .replace(/(?:^\w|[A-Z]|\b\w)/g, function(word, index) {
      return index == 0 ? word.toLowerCase() : word.toUpperCase();
    })
    .replace(/\s+/g, '');
}
