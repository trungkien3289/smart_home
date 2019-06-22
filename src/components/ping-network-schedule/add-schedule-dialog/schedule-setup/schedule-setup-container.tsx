import styled from 'styled-components';
export const ScheduleSetupContainer = styled.div`
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