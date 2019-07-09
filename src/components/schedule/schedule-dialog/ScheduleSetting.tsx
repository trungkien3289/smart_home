import React from 'react';
import CronBuilder from 'react-cron-builder';
import styled from 'styled-components';
const ScheduleSetupContainer = styled.div`
    display: flex;
    width: 100%;
    height: 100%;
    .cron-builder{
        width: 100%;
        display: flex;
        flex-direction: column;
        background-color: transparent;
        .cron-builder__fieldset{
            flex: 1 1 auto;
        }
    }
`;

interface State {
    expression: string;
}

interface Props {
    onChanged: (expression: string) => void;
    expression: string;
}

export default class ScheduleSetting extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = {
            expression: this.props.expression || "* * * * * *",
        }
    }

    componentWillReceiveProps(nextProps: Props){
        if(nextProps.expression !== this.props.expression){
            this.setState({
                expression: nextProps.expression
            })
        }
    }

    onCronChange = (e) => {
        console.log(e);
        this.props.onChanged(e);
      }

    render() {
        return (
            <ScheduleSetupContainer>
                <CronBuilder
                    cronExpression={this.state.expression}
                    onChange={this.onCronChange.bind(this)}
                    showResult={false}
                    value
                />
            </ScheduleSetupContainer>
        )
    }
}