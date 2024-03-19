# effector-dialog

- createDialog - функция для создания модели диалога
- useDialog - хук для взятия данных их модели, созданной функцией createDialog

## Использование

```
//модель

import { createDialog } from "@/shared/libs/effector-dialog";

export const dialog = createDialog();
```

```
//компоненты

export const Component = () => {
  const { isVisible, open, close } = useDialog(dialog);

  return (
    <div>
      <Button view="default" width="auto" onClick={() => open()}>
        Open
      </Button>

      <Dialog isVisible={isVisible} title={"Dialog"} onClose={() => close()}>
      </Dialog>
    </div>
  );
};

```
