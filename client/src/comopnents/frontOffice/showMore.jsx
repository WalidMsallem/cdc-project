import React from 'react';
import './centCard.css';
import ShowMoreText from 'react-show-more-text';

class OverflowText extends React.Component {
  executeOnClick(isExpanded) {
    console.log(isExpanded);
  }

  render() {
    return (
      <ShowMoreText
        lines={3}
        more={<i className="fas fa-chevron-down expand" />}
        less={<i className="fas fa-chevron-up expand-up" />}
        onClick={this.executeOnClick}
      >
        {this.props.item}
      </ShowMoreText>
    );
  }
}

export default OverflowText;
// import React from 'react';
// import ShowMore from 'react-show-more';
// import './centCard.css';

// function OverflowText({ item }) {
//   const [expanded, setExpanded] = React.useState(false);

//   function handleExpandClick() {
//     setExpanded(!expanded);
//   }
//   return (
//     <ShowMore
//       lines={3}
//       more={
//         <i className="fas fa-chevron-down expand" onClick={handleExpandClick} />
//       }
//       less={
//         <i
//           className="fas fa-chevron-up expand-up"
//           onClick={handleExpandClick}
//         />
//       }
//     >
//       {item}
//     </ShowMore>
//   );
// }

// export default OverflowText
