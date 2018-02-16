import { connect } from 'react-redux';
import Lane from './Lane';
import * as laneActions from './LaneActions';
import { compose } from 'redux';
import { DropTarget } from 'react-dnd';
import ItemTypes from '../Kanban/itemTypes';

import { updateLaneRequest, deleteLaneRequest, moveBetweenLanes, removeFromLane, pushToLane, changeLanesRequest } from "./LaneActions";
import { createNote, createNoteRequest } from '../Note/NoteActions';


// podpięcie wszystkich kreatorów akcji do propsów komponentu Lane.
// Najpierw należy zaimportować wszystkie kreatory akcji linii oraz
// akcję tworzenia notek. Można to zrobić w bardzo prosty sposób,
// wykorzystując tzw. wildcards (znak *), co przedstawia poniższy
// kod:

const mapStateToProps = (state, ownProps) => ({
  laneNotes: ownProps.lane.notes.map(noteId => state.notes[noteId])
});



const mapDispatchToProps = {
  ...laneActions,
  updateLane: updateLaneRequest,
  deleteLane: deleteLaneRequest,
  editLane,
  addNote: createNoteRequest,
  createLane: createLaneRequest,
  moveBetweenLanes,
  removeFromLane,
  changeLanesRequest,
  pushToLane,
};

const noteTarget = {
  drop(targetProps, monitor) {
    const sourceProps = monitor.getItem();
    const { id: noteId, laneId: sourceLaneId } = sourceProps;
    if (targetProps.lane.id !== sourceLaneId) {
      targetProps.changeLanesRequest(sourceLaneId, targetProps.lane.id, noteId);
    }

  },
}


export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  DropTarget(ItemTypes.NOTE, noteTarget, (dragConnect) => ({
    connectDropTarget: dragConnect.dropTarget()
  }))
)(Lane);