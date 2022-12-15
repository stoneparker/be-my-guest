import { Text } from './styles';

const H1: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <Text>{children}</Text>
  );
}

export default H1;
