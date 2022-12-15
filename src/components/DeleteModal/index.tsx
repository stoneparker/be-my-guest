import { useEffect, useRef, Ref, FormEvent } from 'react';

import Button from '../../components/Button';
import { api } from '../../services/server';
import { Employee } from '../../types/employee';

import { Container, Form } from './styles';

interface DeleteModalProps {
  employee: Employee | null;
  close: () => void;
}

const DeleteModal: React.FC<DeleteModalProps> = ({ employee, close }) => {
  const modalRef: Ref<HTMLDialogElement> = useRef(null);

  async function handleSubmit(e: FormEvent) {
    await api.delete(`/hotelaria/demo/employee/${employee?.cpf}`);
    close();
  }

  useEffect(() => {
    if (employee) {
      modalRef.current?.showModal();
    } else {
      modalRef.current?.close();
    }
  }, [employee]);

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
            <Button type='button' theme='secondary' onClick={close}>
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
