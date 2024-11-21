const express = require("express");
//create router object
const router = express.Router();

const comments = require('../data/comments')


module.exports = () => {
    router.route('/')
    .get((req, res)=>{
        const  {api, userId} = req.query;
        res.send(comments);
        //comment by userrID
        if(req.query && userId)
            {
        
               res.json(comments.filter(comment=>comment.userId === Number(userId)))
            }
            // comment by postId 
        else if (req.query && postId)
        {
            res.json(comments.filter(comment=>comment.postId === Number(postId)))
        }
    
    })
    .post((req, res, next)=>{

        if (req.body.userId && req.body.postId && req.body.body) {
            const comment = {
              id:    comments.length? comments[comments.length - 1].id + 1 : 0,
              userId: req.body.userId,
              postId: req.body.postId,
              body: req.body.body,
            };
      
            comments.push(comment);
            res.json(comments[comments.length - 1]);
          } else next(error(400, "Insufficient Data"));
    })

    router.route('/:id')
    .get((req, res, next )=>{
        const comment = comments.find((comment)=>comment.id === parseInt(req.params.id))
        if (comment) res.json({comment})
        else next()
    })
    .patch((req, res, next)=>{
        const comment = comments.find((c, i) => {
            if (c.id === parseInt(req.params.id)) {
              comments[i]['body'] = req.body.body;
              return true;
            }
          });
      
          if (comment) res.json(comment);
          else next();
    })
    .delete((req, res, next) => {
        const comment = comments.find((c, i) => {
          if (c.id == req.params.id) {
            comments.splice(i, 1);
            return true;
          }
        });
        if (comment) res.json(comment);
        else next();
      })
    return module.exports = router;
}


