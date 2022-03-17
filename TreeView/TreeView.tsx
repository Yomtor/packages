import React, {
  useState,
  useContext,
  useEffect,
  ReactNode,
  Fragment,
} from "react";
import { TreeViewStyles } from "./TreeView.styles";
import { TreeNodeData, TreeViewProps } from "./TreeView.props";
import { TreeNode } from "./TreeNode";
import { TreeViewContext, TreeViewContextProps } from "./TreeViewContext";
import { DraggableData, DraggableEvent } from "react-draggable";
import { DropEvent } from "../../utils/Droppable/Droppable.props";
import { ScrollArea } from "../../utils/ScrollArea/ScrollArea";
import { ScrollAreaEvent } from "../../utils/ScrollArea/ScrollArea.props";

const TreeViewWrapper: React.FC<TreeViewProps> = ({
  nodeComponent: TreeNode,
  ...props
}) => {
  const context = useContext(TreeViewContext);
  const [scrollTop, setScrollTop] = useState<number>(0);
  const { classes } = TreeViewStyles({ dragging: context.dragging });

  const dropHandler = (data: DropEvent) => {
    const { dragNode, dropNode, position } = context;
    props.sortabled &&
      dropNode &&
      props.onSort({ dragNode, dropNode, position });

    props.onDrop(data);
  };

  const scrollHandler = (event: ScrollAreaEvent) => {
    setScrollTop(event.y);
  };

  let id = 0;
  const nodes = (children: TreeNodeData[], depth = 0): ReactNode =>
    children.map((child, key) => {
      id++;
      return (
        <Fragment key={id}>
          <TreeNode label={22} />
          {child.children &&
            child.children.length &&
            !context.collapsed &&
            nodes(child.children, depth + 1)}
        </Fragment>
      );
    });

  return (
    <ScrollArea
      className={classes.root}
      // onClick={(event) => props.onClick({ data: {}, event })}
      onScroll={scrollHandler}
    >
      <div className={classes.wrapper}>{nodes(props.data)}</div>
    </ScrollArea>
  );
};

/**
 * Description
 */
export const TreeView: React.FC<TreeViewProps> = ({
  collapsed,
  delay,
  ...props
}) => {
  const [context, setContext] = useState<TreeViewContextProps>({
    dragging: false,
    collapsed: collapsed,
    delay: delay,
    count: 0,
  });

  const dragStartHandler = (event: DraggableEvent, data: DraggableData) => {
    setContext({ ...context, dragging: true });
    props.onDragStart(event, data);
  };

  const dragStopHandeler = (event: DraggableEvent, data: DraggableData) => {
    setContext({
      ...context,
      dragging: false,
      dragNode: null,
      dropNode: null,
      count: 0,
    });
    props.onDragStop(event, data);
  };

  useEffect(() => {
    setContext({ ...context, collapsed });
  }, [collapsed]);

  return (
    <TreeViewContext.Provider value={context}>
      <TreeViewWrapper
        {...props}
        onDragStop={dragStopHandeler}
        onDragStart={dragStartHandler}
      />
    </TreeViewContext.Provider>
  );
};

TreeView.defaultProps = {
  collapsed: true,
  editabled: false,
  data: [],
  nodeComponent: TreeNode,
  delay: 5,
};
