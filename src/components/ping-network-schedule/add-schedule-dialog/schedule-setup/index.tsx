import React from 'react';
import CronBuilder from 'react-cron-builder';
import { ScheduleSetupContainer } from './schedule-setup-container';
// import 'react-cron-builder/dist/bundle.css'

interface State {
    expression: string;
}

interface Props {
    onChanged: (expression: string) => void;
    expression: string;
}

export default class ScheduleSetup extends React.Component<Props, State> {

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