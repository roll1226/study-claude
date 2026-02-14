# Page snapshot

```yaml
- generic [ref=e3]:
  - banner [ref=e4]:
    - heading "📝 Todo リスト" [level=1] [ref=e5]
    - paragraph [ref=e6]: タスクを追加・編集・管理しましょう
    - button "💻 システム" [ref=e8] [cursor=pointer]:
      - generic [ref=e9]: 💻
      - generic [ref=e10]: システム
  - generic [ref=e11]:
    - generic [ref=e13]:
      - button "全て (0)" [ref=e14] [cursor=pointer]
      - button "未完了 (0)" [ref=e15] [cursor=pointer]
      - button "対応中 (0)" [ref=e16] [cursor=pointer]
      - button "完了 (0)" [ref=e17] [cursor=pointer]
    - generic [ref=e19]:
      - generic [ref=e21]:
        - generic [ref=e22]:
          - textbox "タスクを入力..." [ref=e24]
          - textbox "説明（任意）" [ref=e26]
        - button "追加" [disabled] [ref=e27]
      - generic [ref=e28]:
        - paragraph [ref=e29]: タスクがありません
        - paragraph [ref=e30]: 上のフォームから新しいタスクを追加してください
```