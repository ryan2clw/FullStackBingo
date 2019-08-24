import React from 'react';
import { Flex } from 'rebass';
import styled from 'styled-components';
import Square from './Square';
import { ICard, IRow } from '../store/cards';

// Create a Title component that'll render an <h1> tag with some styles
const BingoHeader = styled.div`
	width: 132%;
	margin-left: -15%;
	margin-top: -13%;
`
// Create a Wrapper component that'll render a <section> tag with some styles
const Wrapper = styled.div`
    padding: 1rem;
    background: #d6d2cb center url("WoodBack.png");
    height: 300px;
    border-radius: 15px;
    width: 249px;
`;
const Button = styled.div`
    cursor: pointer;
    height:50%;
`
// interface IGameProps {
//     rows: string,
// }
interface IBingoBoardProps {
    columnCount?: number,
    rowJSON?: string,
    calledBalls?: number[],
    card: ICard,
}

class BingoBoard extends React.Component<IBingoBoardProps> {

    bingo = () => {
        alert("BINGO PRESSED!");
    }

    squares = (rowNumber = "0", columnCount: number, rowJSON: IRow) => {
        const numBas = Object.values(rowJSON);
        const calledBalls = this.props.calledBalls;
        return (
            <Flex justifyContent='center' key={"Row(" + rowNumber + ")"} className="aqua">
                {[...Array(columnCount)].map((_, i) => {
                    const reactKey = "Square(" + rowNumber + "," + i + ")";
                    let ticketNumber = numBas[i].toString();
                    if (reactKey === "Square(2,2)") {
                        ticketNumber = "FREE";
                        return (<Square className="ticket-number called" ticketNumber={ticketNumber} key={reactKey} />);
                    }
                    if (calledBalls && calledBalls.length && calledBalls.includes(Number.parseInt(ticketNumber, 10))) {
                        return (<Square ticketNumber={ticketNumber} key={reactKey} className="ticket-number called" />)
                    }
                    return (
                    <Square
                        width="42px"
                        ticketNumber={ticketNumber}
                        key={reactKey}
                        className="ticket-number"
                    />
                    )
                })}
            </Flex>
            );
    };

    rows = (cardJSON: IRow[], columnCount = 5) => {
        return [...Array(cardJSON.length)].map((_, i) => this.squares(i.toString(), columnCount, cardJSON[i]))
    }

    render() {
        return this.props.card && this.props.card.rows ?
            (
                <Wrapper className="align-content-center mx-3 mb-5">
                    <BingoHeader>
                        <img src="BingoBalls.png" alt="Ball Columns" width="100%" />
                    </BingoHeader>
                    {this.rows(this.props.card.rows, 5)}
                    <Button className="d-flex flex-column justify-content-flex-start mt-1" onClick={this.bingo}>
                        <img src="BingoButton.png" alt="Bingo!" className="h-50" />
                    </Button>
                </Wrapper>
            )
            : (
                <h3>N/A</h3>
            );
    }
}
export default BingoBoard;
