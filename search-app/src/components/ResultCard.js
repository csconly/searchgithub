import React, { useEffect, useState } from 'react' 
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import axios from 'axios'
import { SEARCH_URL_USER } from '../config/urls'

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
    },
    details: {
      display: 'flex',
      flexDirection: 'column',
    },
    content: {
      flex: '1 0 auto',
      textAlign: 'left',
    },
    image: {
      width: 300,
      height: 300
    },
    cardDiv: {
        justifyContent: 'center',
        margin: '25px 200px 0'
    }
  }));

export default function ResultCard({result}) {
    const classes = useStyles()
    const [user, setUser] = useState({})

    useEffect(() => {
        if (result.login) {
            axios.get(`${SEARCH_URL_USER}/${result.login}`)
            .then((response) => {
                setUser(response.data)
            }).catch((error) => {
                console.log(error)
            })
        }
    }, [result.id])

    const isNull = (property) => { return property || 'N/A' }

    return (
        <div className={classes.cardDiv}>
            <Card className={classes.root}>
                <CardMedia
                    className={classes.image}
                    image={user.avatar_url}
                    title="GitHub Profile"
                />
                <div className={classes.details} onClick={() => window.open(user.html_url, "_blank")} >
                    <CardContent className={classes.content} >
                        <p>Username: {isNull(user.login)}</p>
                        <p>Location: {isNull(user.location)}</p>
                        <p>Name: {isNull(user.name)}</p>
                        <p>Email: {isNull(user.email)}</p>
                        <p>Repo Count: {isNull(user.public_repos)}</p>
                        <p>Account Created: {isNull(user.created_at)}</p>
                        <p>Last Updated: {isNull(user.updated_at)}</p>
                    </CardContent>
                </div>
            </Card>
        </div>
    )
}