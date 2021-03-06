import Lane from '../models/lane.js'

export function addLane(req, res) {
  if (!req.body.name) {
    res.status(403).end();
  }

  const newLane = new Lane(req.body);

  newLane.notes = [];

  newLane.id = uuid();
  newLane.save((err, saved) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json(saved);
  });
}




export function getLanes(req, res) {
  Lane.find().exec((err, lanes) => {
    if(err) {
      res.status(500).send(err);
    }
    res.json({lanes});
  })
}

export function deleteLane(req, res) {
  Lane.findOne({ id: req.params.laneId }).exec((err, lane) => {
    if (err) {
      res.status(500).send(err);
    }

    lane.remove(() => {
      res.status(200).end();
    });
  });
}

export function editLaneName(req, res) {
  const lane = req.body;
   if(!lane.id ) {
     res.status(403).end();
   }
   // new: boolean if true method return modified document rather than original document.
   // lanes is updated and parsed with .json method.
   Lane.findOneAndUpdate({id: req.params.noteId}, lane, {new: true}, (err, updatedlane) => {
     if(err) {
       res.status(500).send(err);
     }
     res.json(updatedlane);
   })
}

