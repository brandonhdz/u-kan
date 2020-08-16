import React from 'react';
import { withStyles } from "@material-ui/core/styles";
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import { CardContent } from '@material-ui/core';
import { NewTask, Todo, InProgress, Complete } from './ProgressCards';
import { findAllByPlaceholderText } from '@testing-library/react';

const styles = theme => ({
    KanBoard: {
        // Paper Board styling
        display: 'flex',
        flexWrap: 'wrap',
        flexWrap: 'column',
        justifyContent: 'space-around',
        '& > *': {
            width: '100vw',
        },
    },

    KanColumn: {
        // Paper Column styling
        color: '#fff',
        display: 'flex',
        flex: 'auto',
        flexDirection: 'column',
        backgroundColor: '#ff5722',
        padding: '1rem',
        margin: '0 .5rem',
        overflow: 'hidden',
    },
  });


const KanColumn = (props) => {

    const ColumnHeader = (props) => {
        /**
         * Simple clean line to go
         * under each heading column.
         */
        return (
            <React.Fragment>
                <Typography  variant='h2'>
                    {props.title}
                </Typography>
                <div style={{margin: '0 0 1rem 0'}}>
                    <hr width='50%' text-align='left' margin-left='0'></hr>
                </div>
            </React.Fragment>
        )
    }

    return (
        <React.Fragment>
            <ColumnHeader title={props.title}/>
            <GridList>
                {
                    props.title === 'TODO' && 
                    <GridListTile cols={2} key={"0"}>
                        <NewTask action={props.handlers[0]}/>
                    </GridListTile>
                }
                {
                    Object.keys(props.cards).map( (card, index) => (
                    <GridListTile cols={2} key={(index+1).toString()}>
                        {
                            props.title === 'TODO' &&
                            <Todo action={props.handlers[1]} text={props.cards[card].text} hash={card}/>
                        }
                                                {
                            props.title === 'In-Progress' &&
                            <InProgress action={props.handlers[2]} text={props.cards[card].text} hash={card}/>
                        }
                                                {
                            props.title === 'Complete' &&
                            <Complete action={props.handlers[2]} text={props.cards[card].text} hash={card}/>
                        }
                    </GridListTile>
                ))}
            </GridList>
        </React.Fragment>
    );
}

class KanBoard extends React.Component {
    /**
     * Renders and initiates all columns
     */
    constructor (props) {
        super (props);
        this.state = {
            categories: {
                todo: {
                    title: 'TODO',
                    cards: {},
                },
                inProgress: {
                    title: 'In-Progress',
                    cards: {},
                },
                complete: {
                    title: 'Complete',
                    cards: {},
                },
            },
            handleNewTask: this.handleNewTask.bind(this),
            handleBegin: this.handleBegin.bind(this),
            handleComplete: this.handleComplete.bind(this),
        }
    }

    handleNewTask(event, text) {
        /**
         * Based on input from child, update state
         * with new text
         */
        console.log('new: ' + text);

        const updatedState = this.state;
        updatedState.categories.todo.cards[text] = {'text': text};

        this.setState(updatedState);
        
    }

    handleBegin(event, hash) {
        console.log('begin: ' + hash);

        const updatedState = this.state;
        const card = updatedState.categories.todo.cards[hash]

        updatedState.categories.inProgress.cards[hash] = card
        delete updatedState.categories.todo.cards[hash]

        this.setState(updatedState);
    }

    handleComplete(event, hash) {
        console.log('complete: ' + hash);

        const updatedState = this.state;
        const card = updatedState.categories.inProgress.cards[hash]

        updatedState.categories.complete.cards[hash] = card
        delete updatedState.categories.inProgress.cards[hash]

        this.setState(updatedState);    }

    render() {
        const { classes } = this.props;
        const categories = [this.state.categories.todo, this.state.categories.inProgress, this.state.categories.complete]
        const handlers = [this.state.handleNewTask, this.state.handleBegin, this.state.handleComplete]

        return (
            <Box className={classes.KanBoard}>
                {
                    categories.map( (category) => (
                    
                    <Paper className={classes.KanColumn}>
                        <KanColumn handlers={handlers} title={category.title} cards={category.cards}/>
                    </Paper>
                ))}
            </Box>
        );
    }
}

export default withStyles(styles, { withTheme: true })(KanBoard);
