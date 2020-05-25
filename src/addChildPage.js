export function AddChildPageAction(props) {
  return {
    label: "Add sub-page",
    onHandle: () => {
      console.log("props", props);
      debugger;
    },
  };
}
