const extractHeadingsAndTOC = (blocks: any) => {
  const findHeadings = (blockChildren: any) => {
    return blockChildren
      .filter((block: any) => block.type.startsWith('heading'))
      .map((block: any) => {
        const {
          id,
          type
        } = block;
        let text = block[type].rich_text[0]?.plain_text || '';
        if (!block[type].rich_text[0]?.plain_text.trim() && block[type].rich_text[1]) {
          text = block[type].rich_text[1]?.plain_text || '';
        }
        const level = parseInt(type.split('_')[1]);
        return {
          id,
          text,
          level,
          type
        };
      });
  };

  return blocks?.flatMap((block: any) => {
    if (block.type === 'column_list') {
      return block.column_list.columns.flatMap((column: any) => extractHeadingsAndTOC(column.column.children));
    } else if (block.type.startsWith('heading')) {
      return findHeadings([block]);
    } else if (block.type === 'table_of_contents') {
      const {
        id,
        table_of_contents: {color}
      } = block;
      return {
        id,
        type: 'table_of_contents',
        color
      };
    } else {
      return [];
    }
  });
};
export default extractHeadingsAndTOC;
