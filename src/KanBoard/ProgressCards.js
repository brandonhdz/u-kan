import React from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import FormLabel from '@material-ui/core/FormLabel';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import { FormControl } from '@material-ui/core';

const ThemedTextField = withStyles({
    root: {
      '& label.Mui-focused': {
        color: 'lightblue',
      },
      '& .MuiInput-underline:after': {
        borderBottomColor: 'lightblue',
      },
      '& .MuiOutlinedInput-root': {
        '& fieldset': {
          borderColor: 'white',
        },
        '&:hover fieldset': {
          borderColor: 'lightblue',
        },
        '&.Mui-focused fieldset': {
          borderColor: 'lightblue',
        },
      },
    },
  })(TextField);

const NewTask = (props) => {
    return <InputCard {...props} text={"Enter a new task below:"} buttonText='Create Task'/>;
}

const Todo = (props) => {
    return <ActionCard {...props} buttonText='Begin Task' />;
}

const InProgress = (props) => {
    return <ActionCard {...props} buttonText='Complete Task'/>;
}

const Complete = (props) => {
    return <ActionCard {...props} noButton={true}/>;
}

class InputCard extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            handleSubmit: this.handleSubmit.bind(this),
            handleChange: this.handleChange.bind(this),
            inputText: '',
        }
    }

    handleChange (event) {
        this.setState({
            inputText: event.target.value
        });
    }

    handleSubmit (event) {
        // Prevents page reload
        event.preventDefault();
        const text = this.state.inputText;

        if (text !== '' && text != undefined) {
            this.props.action(event, text)
            this.setState({inputText: ''})
        }
    }

    render () {
        return (
            <Card style={{backgroundColor: '#dd2c00', textAlign: 'left'}}>
                <form onSubmit={this.state.handleSubmit} style={{width: '100%',}}>
                    <CardActions>
                        <FormLabel component="label" style={{color: '#fff', marginRight: 'auto',}}>{this.props.text}</FormLabel>
                    </CardActions>
                    <CardActions>
                        <ThemedTextField
                            id="text-input"
                            label="New Task"
                            variant='outlined'
                            size='small'
                            value={this.state.inputText}
                            onChange={this.state.handleChange}
                            style={{color: '#fff'}}
                        />
                        <Button variant='outlined'
                                    type='submit'
                                    style={{
                                        marginLeft: 'auto',
                                        marginRight: 'auto',
                                        backgroundColor: '#00bcd4', color: '#fff'}}>
                                    {this.props.buttonText}
                        </Button>
                    </CardActions>
                </form>
            </Card>
        )
    }
}

class ActionCard extends React.Component {
    /**
     * Based on props input, an appropiate
     * card is returned
     * @param {} props 
     */
    constructor(props) {
        super (props)
        this.state = {
            handleClick: this.handleClick.bind(this),
        }
    }

    handleClick (event) {
        this.props.action(event, this.props.hash);
    }

    render () {
        return (
            <Card style={{backgroundColor: '#dd2c00', textAlign: 'left'}}>
                <CardContent>
                    <Typography style={{color: '#fff'}}>
                        {this.props.text}
                    </Typography>
                    <CardActions >
                    {
                        this.props.noButton ? null :
                        <Button variant='outlined'
                            onClick={this.state.handleClick}
                            fullWidth={true}
                            style={{backgroundColor: '#00bcd4', color: '#fff'}}>
                            {this.props.buttonText}
                        </Button>
                    }
                    </CardActions>
                </CardContent>
            </Card>
        )
    }
}

export {NewTask, Todo, InProgress, Complete};