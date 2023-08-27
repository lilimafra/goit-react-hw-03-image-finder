import { LineWave } from 'react-loader-spinner';
import { LoadWrap } from './Loader.styled';

export const Loader = () => {
  return (
    <LoadWrap>
      <LineWave
        height="100"
        width="100"
        color="#3f51b5"
        ariaLabel="isLoading"
        visible={true}
      />
    </LoadWrap>
  );
};
