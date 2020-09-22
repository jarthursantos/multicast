import styled from 'styled-components'

export const Background = styled.div`
  position: absolute;

  top: -10px;
  bottom: -10px;
  right: -10px;
  left: -10px;

  background-image: url('https://images.unsplash.com/photo-1594796582268-e3480887337a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1483&q=80');
  background-color: ${({ theme }) => theme.colors.background.dark};
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  filter: blur(4px);
  z-index: 0;
`

export const Wrapper = styled.div`
  position: relative;

  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
`

export const Container = styled.div`
  display: flex;

  z-index: 1;

  & > * {
    background: rgba(255, 255, 255, 0.8);
    box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.1);
  }
`

const Card = styled.div`
  border-radius: 8px;
  width: 400px;
  padding: 24px;
`

export const ProgramDataContainer = styled(Card)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;

  padding: 24px;
  border-radius: 8px;
  width: 400px;

  div.icon {
    display: flex;
    align-items: center;
    justify-content: center;

    img {
      width: 120px;
      height: 120px;
    }
  }

  div.data {
    display: flex;
    flex-direction: column;
    align-items: center;

    h1 {
      color: ${({ theme }) => theme.colors.text.primary.dark};
      font-size: 26px;
      font-weight: 600;
    }

    small {
      color: ${({ theme }) => theme.colors.text.secondary.dark};
      font-size: 16px;
      font-weight: 400;
    }
  }
`

export const FormContainer = styled(Card)`
  h1 {
    color: #333;
    font-size: 18px;
  }

  h2 {
    color: #666;
    font-size: 18px;
    margin-bottom: 16px;
  }
`

export const Separator = styled.div`
  margin: 24px 36px;
  width: 2px;
`
