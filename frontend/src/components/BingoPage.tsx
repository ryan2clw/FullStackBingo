import * as React from 'react'
import styled from 'styled-components';
import { connect } from 'react-redux';
// tslint:disable-next-line: no-submodule-imports
import 'bootstrap/dist/css/bootstrap.css';
import { Flex } from 'rebass';
import { Container, Row } from 'reactstrap';
import { IApplicationState, IConnectedReduxProps } from '../store/configureStore';
import { danger, clear } from '../store/messages';

const BackgroundFlex = styled(Flex)`
    background: rgba(0, 0, 0, 0) linear-gradient(to right, rgb(67, 198, 172), \
    rgb(25, 22, 84)) repeat scroll 0% 0%;
    min-height: 680px;
    color:white;
    padding-top:24px;
    flex-direction:column;
`
interface IMessage {
    message: string,
    type: string
}

interface IBingoPageProps {
    message: IMessage
}
class BingoPage extends React.Component<IBingoPageProps & IConnectedReduxProps> {

    componentDidMount() {
        this.props.dispatch(danger("Your API call failed because you never made one"));
        setTimeout(() => {
            this.props.dispatch(clear());
          }, 10000);
    }

    render() {
        return (
        <BackgroundFlex>
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
        </BackgroundFlex>
        )
    }
}
function mapStateToProps(state: IApplicationState) {
    const { message } = state;
    return {
        message,
    }
}
export default connect(mapStateToProps)(BingoPage);
