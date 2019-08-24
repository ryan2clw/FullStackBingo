import * as React from 'react'
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Flex } from 'rebass';
import { Container, Row, Spinner } from 'reactstrap';
import { IApplication, IConnectedReduxProps } from '../store/configureStore';
import BingoBoard from './BingoBoard';
import { requestNumbers } from '../store/cards';
import './styles/App.css';
import './styles/bootstrap.css';

const Body = styled.div`
    min-height:600px;
`
const BackgroundFlex = styled(Flex)`
    background: rgba(0, 0, 0, 0) linear-gradient(to right, rgb(67, 198, 172), \
    rgb(25, 22, 84)) repeat scroll 0% 0%;
    min-height: 680px;
    color:white;
    padding-top:24px;
    flex-direction:column;
`
class BingoPage extends React.Component<IApplication & IConnectedReduxProps> {

    getCards = (cardCount = 2) => requestNumbers(cardCount, this.props.dispatch);

    bingoBoards = (cardCount = 2) => {
        const { cards } = this.props.cards;
        return [...Array(cardCount)].map((_, i) => {
            return (
                <BingoBoard
                    key={"Card-" + i.toString()}
                    card={cards[i]}
                />
                );
        });
    };

    componentDidMount() {
        this.getCards(this.props.cards.cards.length || 6);
    }

    render() {
        return (
        <BackgroundFlex flexDirection="column" justifyContent="center">
            <Container>
                <Row className="justify-content-center">
                    <div className="text-center">
                        { this.props.message && this.props.message.type &&
                            <div className={`alert ${this.props.message.type}`}>
                                {this.props.message.message}
                            </div>
                        }
                    </div>
                </Row>
            </Container>
            {this.props.cards && this.props.cards.cards ? (
            <Container justify='space-evenly' className='pb-3' >
                <div className="row">
                    <div className="col-md-9">
                        <div className="row d-flex flex-row justify-content-center align-items-center">
                            {this.bingoBoards(this.props.cards.cards.length)}
                        </div>
                    </div>
                    <div className="col-md-3">Ball Board</div>
                </div>
            </Container>) :
            (<Container align='center' className='p-4' >
                <div className="row">
                    <Body className="col-md-12">
                        <Spinner />
                    </Body>
                </div>
            </Container>)}
        </BackgroundFlex>
        )
    }
}
function mapStateToProps(state: IApplication) {
    const { message, cards } = state;
    return {
        cards,
        message,
    }
}
export default connect(mapStateToProps)(BingoPage);
