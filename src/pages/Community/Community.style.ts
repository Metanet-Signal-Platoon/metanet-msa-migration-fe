import styled from 'styled-components';

export const Component =  styled.div`
    background-color: #F7F8FF;
    height: 100hv;
`;

export const InsertBtn = styled.div`
    position: fixed;
    bottom: 15%;
    cursor: pointer;
    width: 100%;
    display: flex;
    justify-content: flex-end;
    padding: 0px 20px;
`;

export const ListContainer = styled.div`
    padding: 80px 20px 0px 20px;
`;

export const ListItem = styled.div`
    background-color: white;
    padding: 30px;
    margin: 20px 0px;
    border-radius: 20px;
    cursor: pointer;
`;

export const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 300px;
`;

export const LoadingMessage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 20px;

  p {
    margin: 5px 0;
    font-size: 16px;
    color: #666;
  }

  svg {
    animation: spin 1.5s linear infinite;
  }

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;