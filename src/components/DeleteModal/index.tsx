import { useEffect, useRef, Ref } from 'react';

import Button from '../../components/Button';

import { Container, Form } from './styles';

interface DeleteModalProps {
  open: boolean;
  close: () => void;
}

const DeleteModal: React.FC<DeleteModalProps> = ({ open, close }) => {
  const modalRef: Ref<HTMLDialogElement> = useRef(null);

  function handleSubmit() {
    close();
  }

  useEffect(() => {
    if (open) {
      modalRef.current?.showModal();
    } else {
      modalRef.current?.close();
    }
  }, [open]);

  return (
    <Container ref={modalRef}>
      <Form method='dialog' onSubmit={handleSubmit}>
        <header>
          <h3>Deseja mesmo excluir o funcionário?</h3>
        </header>
        <article>
          <p>Essa ação não poderá ser desfeita.</p>
        </article>
        <footer>
          <menu>
            <Button type='submit' theme='secondary'>
              Cancelar
            </Button>
            <Button type='submit' value='confirm' theme='danger'>Excluir</Button>
          </menu>
        </footer>
      </Form>
    </Container>
  );
}

export default DeleteModal;
