# Failed calculateDatabaseSteps at 2020-01-26T20:50:20.437Z
## RPC One-Liner
```json
{"id":2,"jsonrpc":"2.0","method":"calculateDatabaseSteps","params":{"projectInfo":"","assumeToBeApplied":[{"tag":"CreateSource","source":"db"},{"tag":"CreateArgument","location":{"tag":"Source","source":"db"},"argument":"provider","value":"\"postgresql\""},{"tag":"CreateArgument","location":{"tag":"Source","source":"db"},"argument":"url","value":"env(\"POSTGRESQL_URL\")"},{"tag":"CreateModel","model":"File"},{"tag":"CreateField","model":"File","field":"createdAt","type":"DateTime","arity":"Required"},{"tag":"CreateField","model":"File","field":"extension","type":"String","arity":"Required"},{"tag":"CreateDirective","location":{"path":{"tag":"Field","model":"File","field":"extension"},"directive":"default"}},{"tag":"CreateArgument","location":{"tag":"Directive","path":{"tag":"Field","model":"File","field":"extension"},"directive":"default"},"argument":"","value":"\"\""},{"tag":"CreateField","model":"File","field":"hasStartedUploading","type":"Boolean","arity":"Optional"},{"tag":"CreateField","model":"File","field":"height","type":"Int","arity":"Optional"},{"tag":"CreateField","model":"File","field":"id","type":"String","arity":"Required"},{"tag":"CreateDirective","location":{"path":{"tag":"Field","model":"File","field":"id"},"directive":"id"}},{"tag":"CreateField","model":"File","field":"isFailed","type":"Boolean","arity":"Optional"},{"tag":"CreateField","model":"File","field":"isUploaded","type":"Boolean","arity":"Optional"},{"tag":"CreateField","model":"File","field":"item","type":"Item","arity":"Required"},{"tag":"CreateField","model":"File","field":"name","type":"String","arity":"Required"},{"tag":"CreateDirective","location":{"path":{"tag":"Field","model":"File","field":"name"},"directive":"default"}},{"tag":"CreateArgument","location":{"tag":"Directive","path":{"tag":"Field","model":"File","field":"name"},"directive":"default"},"argument":"","value":"\"\""},{"tag":"CreateField","model":"File","field":"size","type":"String","arity":"Optional"},{"tag":"CreateField","model":"File","field":"updatedAt","type":"DateTime","arity":"Required"},{"tag":"CreateField","model":"File","field":"uploadGroup","type":"UploadGroup","arity":"Required"},{"tag":"CreateField","model":"File","field":"user","type":"User","arity":"Required"},{"tag":"CreateField","model":"File","field":"width","type":"Int","arity":"Optional"},{"tag":"CreateModel","model":"GoogleAccount"},{"tag":"CreateField","model":"GoogleAccount","field":"accountId","type":"String","arity":"Optional"},{"tag":"CreateDirective","location":{"path":{"tag":"Field","model":"GoogleAccount","field":"accountId"},"directive":"unique"}},{"tag":"CreateField","model":"GoogleAccount","field":"createdAt","type":"DateTime","arity":"Required"},{"tag":"CreateField","model":"GoogleAccount","field":"email","type":"String","arity":"Optional"},{"tag":"CreateField","model":"GoogleAccount","field":"firstName","type":"String","arity":"Optional"},{"tag":"CreateField","model":"GoogleAccount","field":"id","type":"String","arity":"Required"},{"tag":"CreateDirective","location":{"path":{"tag":"Field","model":"GoogleAccount","field":"id"},"directive":"id"}},{"tag":"CreateField","model":"GoogleAccount","field":"lastName","type":"String","arity":"Optional"},{"tag":"CreateField","model":"GoogleAccount","field":"picture","type":"String","arity":"Optional"},{"tag":"CreateField","model":"GoogleAccount","field":"refreshToken","type":"String","arity":"Optional"},{"tag":"CreateField","model":"GoogleAccount","field":"updatedAt","type":"DateTime","arity":"Required"},{"tag":"CreateField","model":"GoogleAccount","field":"user","type":"User","arity":"Required"},{"tag":"CreateModel","model":"Item"},{"tag":"CreateField","model":"Item","field":"createdAt","type":"DateTime","arity":"Required"},{"tag":"CreateField","model":"Item","field":"id","type":"String","arity":"Required"},{"tag":"CreateDirective","location":{"path":{"tag":"Field","model":"Item","field":"id"},"directive":"id"}},{"tag":"CreateField","model":"Item","field":"isFavorited","type":"Boolean","arity":"Required"},{"tag":"CreateDirective","location":{"path":{"tag":"Field","model":"Item","field":"isFavorited"},"directive":"default"}},{"tag":"CreateArgument","location":{"tag":"Directive","path":{"tag":"Field","model":"Item","field":"isFavorited"},"directive":"default"},"argument":"","value":"false"},{"tag":"CreateField","model":"Item","field":"link","type":"Link","arity":"Optional"},{"tag":"CreateField","model":"Item","field":"note","type":"Note","arity":"Optional"},{"tag":"CreateField","model":"Item","field":"type","type":"String","arity":"Required"},{"tag":"CreateDirective","location":{"path":{"tag":"Field","model":"Item","field":"type"},"directive":"default"}},{"tag":"CreateArgument","location":{"tag":"Directive","path":{"tag":"Field","model":"Item","field":"type"},"directive":"default"},"argument":"","value":"\"\""},{"tag":"CreateField","model":"Item","field":"updatedAt","type":"DateTime","arity":"Required"},{"tag":"CreateField","model":"Item","field":"user","type":"User","arity":"Optional"},{"tag":"CreateField","model":"Item","field":"file","type":"File","arity":"Optional"},{"tag":"CreateField","model":"Item","field":"labels","type":"Label","arity":"List"},{"tag":"CreateModel","model":"Label"},{"tag":"CreateField","model":"Label","field":"createdAt","type":"DateTime","arity":"Required"},{"tag":"CreateField","model":"Label","field":"id","type":"String","arity":"Required"},{"tag":"CreateDirective","location":{"path":{"tag":"Field","model":"Label","field":"id"},"directive":"id"}},{"tag":"CreateField","model":"Label","field":"name","type":"String","arity":"Required"},{"tag":"CreateDirective","location":{"path":{"tag":"Field","model":"Label","field":"name"},"directive":"default"}},{"tag":"CreateArgument","location":{"tag":"Directive","path":{"tag":"Field","model":"Label","field":"name"},"directive":"default"},"argument":"","value":"\"\""},{"tag":"CreateField","model":"Label","field":"updatedAt","type":"DateTime","arity":"Required"},{"tag":"CreateField","model":"Label","field":"user","type":"User","arity":"Required"},{"tag":"CreateField","model":"Label","field":"items","type":"Item","arity":"List"},{"tag":"CreateModel","model":"Link"},{"tag":"CreateField","model":"Link","field":"createdAt","type":"DateTime","arity":"Required"},{"tag":"CreateField","model":"Link","field":"description","type":"String","arity":"Optional"},{"tag":"CreateField","model":"Link","field":"favicon","type":"String","arity":"Optional"},{"tag":"CreateField","model":"Link","field":"href","type":"String","arity":"Required"},{"tag":"CreateDirective","location":{"path":{"tag":"Field","model":"Link","field":"href"},"directive":"default"}},{"tag":"CreateArgument","location":{"tag":"Directive","path":{"tag":"Field","model":"Link","field":"href"},"directive":"default"},"argument":"","value":"\"\""},{"tag":"CreateField","model":"Link","field":"id","type":"String","arity":"Required"},{"tag":"CreateDirective","location":{"path":{"tag":"Field","model":"Link","field":"id"},"directive":"id"}},{"tag":"CreateField","model":"Link","field":"image","type":"String","arity":"Optional"},{"tag":"CreateField","model":"Link","field":"notes","type":"String","arity":"Required"},{"tag":"CreateDirective","location":{"path":{"tag":"Field","model":"Link","field":"notes"},"directive":"default"}},{"tag":"CreateArgument","location":{"tag":"Directive","path":{"tag":"Field","model":"Link","field":"notes"},"directive":"default"},"argument":"","value":"\"\""},{"tag":"CreateField","model":"Link","field":"title","type":"String","arity":"Optional"},{"tag":"CreateField","model":"Link","field":"updatedAt","type":"DateTime","arity":"Required"},{"tag":"CreateField","model":"Link","field":"user","type":"User","arity":"Required"},{"tag":"CreateField","model":"Link","field":"item","type":"Item","arity":"Optional"},{"tag":"CreateModel","model":"Note"},{"tag":"CreateField","model":"Note","field":"createdAt","type":"DateTime","arity":"Required"},{"tag":"CreateField","model":"Note","field":"id","type":"String","arity":"Required"},{"tag":"CreateDirective","location":{"path":{"tag":"Field","model":"Note","field":"id"},"directive":"id"}},{"tag":"CreateField","model":"Note","field":"raw","type":"String","arity":"Required"},{"tag":"CreateDirective","location":{"path":{"tag":"Field","model":"Note","field":"raw"},"directive":"default"}},{"tag":"CreateArgument","location":{"tag":"Directive","path":{"tag":"Field","model":"Note","field":"raw"},"directive":"default"},"argument":"","value":"\"\""},{"tag":"CreateField","model":"Note","field":"text","type":"String","arity":"Required"},{"tag":"CreateDirective","location":{"path":{"tag":"Field","model":"Note","field":"text"},"directive":"default"}},{"tag":"CreateArgument","location":{"tag":"Directive","path":{"tag":"Field","model":"Note","field":"text"},"directive":"default"},"argument":"","value":"\"\""},{"tag":"CreateField","model":"Note","field":"updatedAt","type":"DateTime","arity":"Required"},{"tag":"CreateField","model":"Note","field":"user","type":"User","arity":"Required"},{"tag":"CreateField","model":"Note","field":"item","type":"Item","arity":"Optional"},{"tag":"CreateModel","model":"UploadGroup"},{"tag":"CreateField","model":"UploadGroup","field":"createdAt","type":"DateTime","arity":"Required"},{"tag":"CreateField","model":"UploadGroup","field":"id","type":"String","arity":"Required"},{"tag":"CreateDirective","location":{"path":{"tag":"Field","model":"UploadGroup","field":"id"},"directive":"id"}},{"tag":"CreateField","model":"UploadGroup","field":"isComplete","type":"Boolean","arity":"Optional"},{"tag":"CreateField","model":"UploadGroup","field":"isFailed","type":"Boolean","arity":"Optional"},{"tag":"CreateField","model":"UploadGroup","field":"updatedAt","type":"DateTime","arity":"Required"},{"tag":"CreateField","model":"UploadGroup","field":"user","type":"User","arity":"Required"},{"tag":"CreateField","model":"UploadGroup","field":"files","type":"File","arity":"List"},{"tag":"CreateModel","model":"User"},{"tag":"CreateField","model":"User","field":"email","type":"String","arity":"Required"},{"tag":"CreateDirective","location":{"path":{"tag":"Field","model":"User","field":"email"},"directive":"default"}},{"tag":"CreateArgument","location":{"tag":"Directive","path":{"tag":"Field","model":"User","field":"email"},"directive":"default"},"argument":"","value":"\"\""},{"tag":"CreateDirective","location":{"path":{"tag":"Field","model":"User","field":"email"},"directive":"unique"}},{"tag":"CreateField","model":"User","field":"firstName","type":"String","arity":"Optional"},{"tag":"CreateField","model":"User","field":"id","type":"String","arity":"Required"},{"tag":"CreateDirective","location":{"path":{"tag":"Field","model":"User","field":"id"},"directive":"id"}},{"tag":"CreateField","model":"User","field":"lastName","type":"String","arity":"Optional"},{"tag":"CreateField","model":"User","field":"files","type":"File","arity":"List"},{"tag":"CreateField","model":"User","field":"googleAccounts","type":"GoogleAccount","arity":"List"},{"tag":"CreateField","model":"User","field":"items","type":"Item","arity":"List"},{"tag":"CreateField","model":"User","field":"labels","type":"Label","arity":"List"},{"tag":"CreateField","model":"User","field":"links","type":"Link","arity":"List"},{"tag":"CreateField","model":"User","field":"notes","type":"Note","arity":"List"},{"tag":"CreateField","model":"User","field":"uploadGroups","type":"UploadGroup","arity":"List"},{"tag":"CreateField","model":"Item","field":"isResolved","type":"Boolean","arity":"Required"},{"tag":"CreateDirective","location":{"path":{"tag":"Field","model":"Item","field":"isResolved"},"directive":"default"}},{"tag":"CreateArgument","location":{"tag":"Directive","path":{"tag":"Field","model":"Item","field":"isResolved"},"directive":"default"},"argument":"","value":"false"},{"tag":"CreateField","model":"Item","field":"status","type":"String","arity":"Optional"},{"tag":"DeleteField","model":"Item","field":"isResolved"},{"tag":"CreateDirective","location":{"path":{"tag":"Field","model":"Item","field":"status"},"directive":"default"}},{"tag":"CreateArgument","location":{"tag":"Directive","path":{"tag":"Field","model":"Item","field":"status"},"directive":"default"},"argument":"","value":"\"NOT_STARTED\""}],"stepsToApply":[{"tag":"CreateSource","source":"postgresql"},{"tag":"CreateArgument","location":{"tag":"Source","source":"postgresql"},"argument":"provider","value":"\"postgresql\""},{"tag":"CreateArgument","location":{"tag":"Source","source":"postgresql"},"argument":"url","value":"env(\"POSTGRESQL_URL\")"},{"tag":"DeleteSource","source":"db"},{"tag":"CreateModel","model":"InviteCode"},{"tag":"CreateField","model":"InviteCode","field":"id","type":"String","arity":"Required"},{"tag":"CreateDirective","location":{"path":{"tag":"Field","model":"InviteCode","field":"id"},"directive":"id"}},{"tag":"CreateDirective","location":{"path":{"tag":"Field","model":"InviteCode","field":"id"},"directive":"default"}},{"tag":"CreateArgument","location":{"tag":"Directive","path":{"tag":"Field","model":"InviteCode","field":"id"},"directive":"default"},"argument":"","value":"cuid()"},{"tag":"CreateField","model":"InviteCode","field":"code","type":"String","arity":"Required"},{"tag":"CreateField","model":"InviteCode","field":"users","type":"User","arity":"List"},{"tag":"CreateField","model":"InviteCode","field":"createdAt","type":"DateTime","arity":"Required"},{"tag":"CreateDirective","location":{"path":{"tag":"Field","model":"InviteCode","field":"createdAt"},"directive":"default"}},{"tag":"CreateArgument","location":{"tag":"Directive","path":{"tag":"Field","model":"InviteCode","field":"createdAt"},"directive":"default"},"argument":"","value":"now()"},{"tag":"CreateField","model":"InviteCode","field":"updatedAt","type":"DateTime","arity":"Required"},{"tag":"CreateDirective","location":{"path":{"tag":"Field","model":"InviteCode","field":"updatedAt"},"directive":"updatedAt"}},{"tag":"CreateModel","model":"Email"},{"tag":"CreateField","model":"Email","field":"id","type":"String","arity":"Required"},{"tag":"CreateDirective","location":{"path":{"tag":"Field","model":"Email","field":"id"},"directive":"id"}},{"tag":"CreateDirective","location":{"path":{"tag":"Field","model":"Email","field":"id"},"directive":"default"}},{"tag":"CreateArgument","location":{"tag":"Directive","path":{"tag":"Field","model":"Email","field":"id"},"directive":"default"},"argument":"","value":"cuid()"},{"tag":"CreateField","model":"Email","field":"email","type":"String","arity":"Required"},{"tag":"CreateField","model":"Email","field":"createdAt","type":"DateTime","arity":"Required"},{"tag":"CreateDirective","location":{"path":{"tag":"Field","model":"Email","field":"createdAt"},"directive":"default"}},{"tag":"CreateArgument","location":{"tag":"Directive","path":{"tag":"Field","model":"Email","field":"createdAt"},"directive":"default"},"argument":"","value":"now()"},{"tag":"CreateField","model":"Email","field":"updatedAt","type":"DateTime","arity":"Required"},{"tag":"CreateDirective","location":{"path":{"tag":"Field","model":"Email","field":"updatedAt"},"directive":"updatedAt"}},{"tag":"CreateDirective","location":{"path":{"tag":"Field","model":"File","field":"createdAt"},"directive":"default"}},{"tag":"CreateArgument","location":{"tag":"Directive","path":{"tag":"Field","model":"File","field":"createdAt"},"directive":"default"},"argument":"","value":"now()"},{"tag":"CreateDirective","location":{"path":{"tag":"Field","model":"File","field":"id"},"directive":"default"}},{"tag":"CreateArgument","location":{"tag":"Directive","path":{"tag":"Field","model":"File","field":"id"},"directive":"default"},"argument":"","value":"cuid()"},{"tag":"CreateDirective","location":{"path":{"tag":"Field","model":"File","field":"updatedAt"},"directive":"updatedAt"}},{"tag":"CreateDirective","location":{"path":{"tag":"Field","model":"GoogleAccount","field":"createdAt"},"directive":"default"}},{"tag":"CreateArgument","location":{"tag":"Directive","path":{"tag":"Field","model":"GoogleAccount","field":"createdAt"},"directive":"default"},"argument":"","value":"now()"},{"tag":"CreateDirective","location":{"path":{"tag":"Field","model":"GoogleAccount","field":"id"},"directive":"default"}},{"tag":"CreateArgument","location":{"tag":"Directive","path":{"tag":"Field","model":"GoogleAccount","field":"id"},"directive":"default"},"argument":"","value":"cuid()"},{"tag":"CreateDirective","location":{"path":{"tag":"Field","model":"GoogleAccount","field":"updatedAt"},"directive":"updatedAt"}},{"tag":"CreateDirective","location":{"path":{"tag":"Field","model":"Item","field":"createdAt"},"directive":"default"}},{"tag":"CreateArgument","location":{"tag":"Directive","path":{"tag":"Field","model":"Item","field":"createdAt"},"directive":"default"},"argument":"","value":"now()"},{"tag":"CreateDirective","location":{"path":{"tag":"Field","model":"Item","field":"id"},"directive":"default"}},{"tag":"CreateArgument","location":{"tag":"Directive","path":{"tag":"Field","model":"Item","field":"id"},"directive":"default"},"argument":"","value":"cuid()"},{"tag":"CreateDirective","location":{"path":{"tag":"Field","model":"Item","field":"updatedAt"},"directive":"updatedAt"}},{"tag":"CreateDirective","location":{"path":{"tag":"Field","model":"Label","field":"createdAt"},"directive":"default"}},{"tag":"CreateArgument","location":{"tag":"Directive","path":{"tag":"Field","model":"Label","field":"createdAt"},"directive":"default"},"argument":"","value":"now()"},{"tag":"CreateDirective","location":{"path":{"tag":"Field","model":"Label","field":"id"},"directive":"default"}},{"tag":"CreateArgument","location":{"tag":"Directive","path":{"tag":"Field","model":"Label","field":"id"},"directive":"default"},"argument":"","value":"cuid()"},{"tag":"CreateDirective","location":{"path":{"tag":"Field","model":"Label","field":"updatedAt"},"directive":"updatedAt"}},{"tag":"CreateDirective","location":{"path":{"tag":"Field","model":"Link","field":"createdAt"},"directive":"default"}},{"tag":"CreateArgument","location":{"tag":"Directive","path":{"tag":"Field","model":"Link","field":"createdAt"},"directive":"default"},"argument":"","value":"now()"},{"tag":"CreateDirective","location":{"path":{"tag":"Field","model":"Link","field":"id"},"directive":"default"}},{"tag":"CreateArgument","location":{"tag":"Directive","path":{"tag":"Field","model":"Link","field":"id"},"directive":"default"},"argument":"","value":"cuid()"},{"tag":"CreateDirective","location":{"path":{"tag":"Field","model":"Link","field":"updatedAt"},"directive":"updatedAt"}},{"tag":"CreateDirective","location":{"path":{"tag":"Field","model":"Note","field":"createdAt"},"directive":"default"}},{"tag":"CreateArgument","location":{"tag":"Directive","path":{"tag":"Field","model":"Note","field":"createdAt"},"directive":"default"},"argument":"","value":"now()"},{"tag":"CreateDirective","location":{"path":{"tag":"Field","model":"Note","field":"id"},"directive":"default"}},{"tag":"CreateArgument","location":{"tag":"Directive","path":{"tag":"Field","model":"Note","field":"id"},"directive":"default"},"argument":"","value":"cuid()"},{"tag":"CreateDirective","location":{"path":{"tag":"Field","model":"Note","field":"updatedAt"},"directive":"updatedAt"}},{"tag":"CreateDirective","location":{"path":{"tag":"Field","model":"UploadGroup","field":"createdAt"},"directive":"default"}},{"tag":"CreateArgument","location":{"tag":"Directive","path":{"tag":"Field","model":"UploadGroup","field":"createdAt"},"directive":"default"},"argument":"","value":"now()"},{"tag":"CreateDirective","location":{"path":{"tag":"Field","model":"UploadGroup","field":"id"},"directive":"default"}},{"tag":"CreateArgument","location":{"tag":"Directive","path":{"tag":"Field","model":"UploadGroup","field":"id"},"directive":"default"},"argument":"","value":"cuid()"},{"tag":"CreateDirective","location":{"path":{"tag":"Field","model":"UploadGroup","field":"updatedAt"},"directive":"updatedAt"}},{"tag":"CreateField","model":"User","field":"role","type":"String","arity":"Required"},{"tag":"CreateDirective","location":{"path":{"tag":"Field","model":"User","field":"role"},"directive":"default"}},{"tag":"CreateArgument","location":{"tag":"Directive","path":{"tag":"Field","model":"User","field":"role"},"directive":"default"},"argument":"","value":"\"\""},{"tag":"CreateField","model":"User","field":"isActive","type":"Boolean","arity":"Required"},{"tag":"CreateDirective","location":{"path":{"tag":"Field","model":"User","field":"isActive"},"directive":"default"}},{"tag":"CreateArgument","location":{"tag":"Directive","path":{"tag":"Field","model":"User","field":"isActive"},"directive":"default"},"argument":"","value":"false"},{"tag":"CreateField","model":"User","field":"inviteCode","type":"InviteCode","arity":"Optional"},{"tag":"CreateField","model":"User","field":"createdAt","type":"DateTime","arity":"Required"},{"tag":"CreateDirective","location":{"path":{"tag":"Field","model":"User","field":"createdAt"},"directive":"default"}},{"tag":"CreateArgument","location":{"tag":"Directive","path":{"tag":"Field","model":"User","field":"createdAt"},"directive":"default"},"argument":"","value":"now()"},{"tag":"CreateField","model":"User","field":"updatedAt","type":"DateTime","arity":"Required"},{"tag":"CreateDirective","location":{"path":{"tag":"Field","model":"User","field":"updatedAt"},"directive":"updatedAt"}},{"tag":"CreateDirective","location":{"path":{"tag":"Field","model":"User","field":"id"},"directive":"default"}},{"tag":"CreateArgument","location":{"tag":"Directive","path":{"tag":"Field","model":"User","field":"id"},"directive":"default"},"argument":"","value":"cuid()"}],"sourceConfig":"generator js {\n  provider = \"prisma-client-js\"\n}\n\ndatasource postgresql {\n  provider = \"postgresql\"\n  url      = env(\"POSTGRESQL_URL\")\n}\n\nmodel InviteCode {\n  id String @id @default(cuid())\n\n  code String\n\n  users User[]\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n}\n\nmodel Email {\n  id String @id @default(cuid())\n\n  email String\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n}\n\nmodel File {\n  extension           String   @default(\"\")\n  hasStartedUploading Boolean?\n  height              Int?\n  id                  String   @id @default(cuid())\n  isFailed            Boolean?\n  isUploaded          Boolean?\n  item                Item\n  name                String   @default(\"\")\n  size                String?\n\n  uploadGroup UploadGroup\n  user        User\n  width       Int?\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n}\n\nmodel GoogleAccount {\n  accountId    String? @unique\n  email        String?\n  firstName    String?\n  id           String  @id @default(cuid())\n  lastName     String?\n  picture      String?\n  refreshToken String?\n  user         User\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n}\n\nmodel Item {\n  id          String   @id @default(cuid())\n  isFavorited Boolean  @default(false)\n  status      String?  @default(\"NOT_STARTED\")\n  link        Link?\n  note        Note?\n  type        String   @default(\"\")\n  user        User?\n  file        File?\n  labels      Label[]\n  createdAt   DateTime @default(now())\n  updatedAt   DateTime @updatedAt\n}\n\nmodel Label {\n  id        String   @id @default(cuid())\n  name      String   @default(\"\")\n  user      User\n  items     Item[]\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n}\n\nmodel Link {\n  description String?\n  favicon     String?\n  href        String  @default(\"\")\n  id          String  @id @default(cuid())\n  image       String?\n  notes       String  @default(\"\")\n  title       String?\n  user        User\n  item        Item?\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n}\n\nmodel Note {\n  id        String   @id @default(cuid())\n  raw       String   @default(\"\")\n  text      String   @default(\"\")\n  user      User\n  item      Item?\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n}\n\nmodel UploadGroup {\n  id         String   @id @default(cuid())\n  isComplete Boolean?\n  isFailed   Boolean?\n  user       User\n  files      File[]\n  createdAt  DateTime @default(now())\n  updatedAt  DateTime @updatedAt\n}\n\nmodel User {\n  email          String          @default(\"\") @unique\n  firstName      String?\n  id             String          @id @default(cuid())\n  lastName       String?\n  files          File[]\n  googleAccounts GoogleAccount[]\n  items          Item[]\n  labels         Label[]\n  links          Link[]\n  notes          Note[]\n  uploadGroups   UploadGroup[]\n\n  role     String  @default(\"\")\n  isActive Boolean @default(false)\n\n  inviteCode InviteCode?\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n}"}}
```

## RPC Input Readable
```json
{
  "id": 2,
  "jsonrpc": "2.0",
  "method": "calculateDatabaseSteps",
  "params": {
    "projectInfo": "",
    "assumeToBeApplied": [
      {
        "tag": "CreateSource",
        "source": "db"
      },
      {
        "tag": "CreateArgument",
        "location": {
          "tag": "Source",
          "source": "db"
        },
        "argument": "provider",
        "value": "\"postgresql\""
      },
      {
        "tag": "CreateArgument",
        "location": {
          "tag": "Source",
          "source": "db"
        },
        "argument": "url",
        "value": "env(\"POSTGRESQL_URL\")"
      },
      {
        "tag": "CreateModel",
        "model": "File"
      },
      {
        "tag": "CreateField",
        "model": "File",
        "field": "createdAt",
        "type": "DateTime",
        "arity": "Required"
      },
      {
        "tag": "CreateField",
        "model": "File",
        "field": "extension",
        "type": "String",
        "arity": "Required"
      },
      {
        "tag": "CreateDirective",
        "location": {
          "path": {
            "tag": "Field",
            "model": "File",
            "field": "extension"
          },
          "directive": "default"
        }
      },
      {
        "tag": "CreateArgument",
        "location": {
          "tag": "Directive",
          "path": {
            "tag": "Field",
            "model": "File",
            "field": "extension"
          },
          "directive": "default"
        },
        "argument": "",
        "value": "\"\""
      },
      {
        "tag": "CreateField",
        "model": "File",
        "field": "hasStartedUploading",
        "type": "Boolean",
        "arity": "Optional"
      },
      {
        "tag": "CreateField",
        "model": "File",
        "field": "height",
        "type": "Int",
        "arity": "Optional"
      },
      {
        "tag": "CreateField",
        "model": "File",
        "field": "id",
        "type": "String",
        "arity": "Required"
      },
      {
        "tag": "CreateDirective",
        "location": {
          "path": {
            "tag": "Field",
            "model": "File",
            "field": "id"
          },
          "directive": "id"
        }
      },
      {
        "tag": "CreateField",
        "model": "File",
        "field": "isFailed",
        "type": "Boolean",
        "arity": "Optional"
      },
      {
        "tag": "CreateField",
        "model": "File",
        "field": "isUploaded",
        "type": "Boolean",
        "arity": "Optional"
      },
      {
        "tag": "CreateField",
        "model": "File",
        "field": "item",
        "type": "Item",
        "arity": "Required"
      },
      {
        "tag": "CreateField",
        "model": "File",
        "field": "name",
        "type": "String",
        "arity": "Required"
      },
      {
        "tag": "CreateDirective",
        "location": {
          "path": {
            "tag": "Field",
            "model": "File",
            "field": "name"
          },
          "directive": "default"
        }
      },
      {
        "tag": "CreateArgument",
        "location": {
          "tag": "Directive",
          "path": {
            "tag": "Field",
            "model": "File",
            "field": "name"
          },
          "directive": "default"
        },
        "argument": "",
        "value": "\"\""
      },
      {
        "tag": "CreateField",
        "model": "File",
        "field": "size",
        "type": "String",
        "arity": "Optional"
      },
      {
        "tag": "CreateField",
        "model": "File",
        "field": "updatedAt",
        "type": "DateTime",
        "arity": "Required"
      },
      {
        "tag": "CreateField",
        "model": "File",
        "field": "uploadGroup",
        "type": "UploadGroup",
        "arity": "Required"
      },
      {
        "tag": "CreateField",
        "model": "File",
        "field": "user",
        "type": "User",
        "arity": "Required"
      },
      {
        "tag": "CreateField",
        "model": "File",
        "field": "width",
        "type": "Int",
        "arity": "Optional"
      },
      {
        "tag": "CreateModel",
        "model": "GoogleAccount"
      },
      {
        "tag": "CreateField",
        "model": "GoogleAccount",
        "field": "accountId",
        "type": "String",
        "arity": "Optional"
      },
      {
        "tag": "CreateDirective",
        "location": {
          "path": {
            "tag": "Field",
            "model": "GoogleAccount",
            "field": "accountId"
          },
          "directive": "unique"
        }
      },
      {
        "tag": "CreateField",
        "model": "GoogleAccount",
        "field": "createdAt",
        "type": "DateTime",
        "arity": "Required"
      },
      {
        "tag": "CreateField",
        "model": "GoogleAccount",
        "field": "email",
        "type": "String",
        "arity": "Optional"
      },
      {
        "tag": "CreateField",
        "model": "GoogleAccount",
        "field": "firstName",
        "type": "String",
        "arity": "Optional"
      },
      {
        "tag": "CreateField",
        "model": "GoogleAccount",
        "field": "id",
        "type": "String",
        "arity": "Required"
      },
      {
        "tag": "CreateDirective",
        "location": {
          "path": {
            "tag": "Field",
            "model": "GoogleAccount",
            "field": "id"
          },
          "directive": "id"
        }
      },
      {
        "tag": "CreateField",
        "model": "GoogleAccount",
        "field": "lastName",
        "type": "String",
        "arity": "Optional"
      },
      {
        "tag": "CreateField",
        "model": "GoogleAccount",
        "field": "picture",
        "type": "String",
        "arity": "Optional"
      },
      {
        "tag": "CreateField",
        "model": "GoogleAccount",
        "field": "refreshToken",
        "type": "String",
        "arity": "Optional"
      },
      {
        "tag": "CreateField",
        "model": "GoogleAccount",
        "field": "updatedAt",
        "type": "DateTime",
        "arity": "Required"
      },
      {
        "tag": "CreateField",
        "model": "GoogleAccount",
        "field": "user",
        "type": "User",
        "arity": "Required"
      },
      {
        "tag": "CreateModel",
        "model": "Item"
      },
      {
        "tag": "CreateField",
        "model": "Item",
        "field": "createdAt",
        "type": "DateTime",
        "arity": "Required"
      },
      {
        "tag": "CreateField",
        "model": "Item",
        "field": "id",
        "type": "String",
        "arity": "Required"
      },
      {
        "tag": "CreateDirective",
        "location": {
          "path": {
            "tag": "Field",
            "model": "Item",
            "field": "id"
          },
          "directive": "id"
        }
      },
      {
        "tag": "CreateField",
        "model": "Item",
        "field": "isFavorited",
        "type": "Boolean",
        "arity": "Required"
      },
      {
        "tag": "CreateDirective",
        "location": {
          "path": {
            "tag": "Field",
            "model": "Item",
            "field": "isFavorited"
          },
          "directive": "default"
        }
      },
      {
        "tag": "CreateArgument",
        "location": {
          "tag": "Directive",
          "path": {
            "tag": "Field",
            "model": "Item",
            "field": "isFavorited"
          },
          "directive": "default"
        },
        "argument": "",
        "value": "false"
      },
      {
        "tag": "CreateField",
        "model": "Item",
        "field": "link",
        "type": "Link",
        "arity": "Optional"
      },
      {
        "tag": "CreateField",
        "model": "Item",
        "field": "note",
        "type": "Note",
        "arity": "Optional"
      },
      {
        "tag": "CreateField",
        "model": "Item",
        "field": "type",
        "type": "String",
        "arity": "Required"
      },
      {
        "tag": "CreateDirective",
        "location": {
          "path": {
            "tag": "Field",
            "model": "Item",
            "field": "type"
          },
          "directive": "default"
        }
      },
      {
        "tag": "CreateArgument",
        "location": {
          "tag": "Directive",
          "path": {
            "tag": "Field",
            "model": "Item",
            "field": "type"
          },
          "directive": "default"
        },
        "argument": "",
        "value": "\"\""
      },
      {
        "tag": "CreateField",
        "model": "Item",
        "field": "updatedAt",
        "type": "DateTime",
        "arity": "Required"
      },
      {
        "tag": "CreateField",
        "model": "Item",
        "field": "user",
        "type": "User",
        "arity": "Optional"
      },
      {
        "tag": "CreateField",
        "model": "Item",
        "field": "file",
        "type": "File",
        "arity": "Optional"
      },
      {
        "tag": "CreateField",
        "model": "Item",
        "field": "labels",
        "type": "Label",
        "arity": "List"
      },
      {
        "tag": "CreateModel",
        "model": "Label"
      },
      {
        "tag": "CreateField",
        "model": "Label",
        "field": "createdAt",
        "type": "DateTime",
        "arity": "Required"
      },
      {
        "tag": "CreateField",
        "model": "Label",
        "field": "id",
        "type": "String",
        "arity": "Required"
      },
      {
        "tag": "CreateDirective",
        "location": {
          "path": {
            "tag": "Field",
            "model": "Label",
            "field": "id"
          },
          "directive": "id"
        }
      },
      {
        "tag": "CreateField",
        "model": "Label",
        "field": "name",
        "type": "String",
        "arity": "Required"
      },
      {
        "tag": "CreateDirective",
        "location": {
          "path": {
            "tag": "Field",
            "model": "Label",
            "field": "name"
          },
          "directive": "default"
        }
      },
      {
        "tag": "CreateArgument",
        "location": {
          "tag": "Directive",
          "path": {
            "tag": "Field",
            "model": "Label",
            "field": "name"
          },
          "directive": "default"
        },
        "argument": "",
        "value": "\"\""
      },
      {
        "tag": "CreateField",
        "model": "Label",
        "field": "updatedAt",
        "type": "DateTime",
        "arity": "Required"
      },
      {
        "tag": "CreateField",
        "model": "Label",
        "field": "user",
        "type": "User",
        "arity": "Required"
      },
      {
        "tag": "CreateField",
        "model": "Label",
        "field": "items",
        "type": "Item",
        "arity": "List"
      },
      {
        "tag": "CreateModel",
        "model": "Link"
      },
      {
        "tag": "CreateField",
        "model": "Link",
        "field": "createdAt",
        "type": "DateTime",
        "arity": "Required"
      },
      {
        "tag": "CreateField",
        "model": "Link",
        "field": "description",
        "type": "String",
        "arity": "Optional"
      },
      {
        "tag": "CreateField",
        "model": "Link",
        "field": "favicon",
        "type": "String",
        "arity": "Optional"
      },
      {
        "tag": "CreateField",
        "model": "Link",
        "field": "href",
        "type": "String",
        "arity": "Required"
      },
      {
        "tag": "CreateDirective",
        "location": {
          "path": {
            "tag": "Field",
            "model": "Link",
            "field": "href"
          },
          "directive": "default"
        }
      },
      {
        "tag": "CreateArgument",
        "location": {
          "tag": "Directive",
          "path": {
            "tag": "Field",
            "model": "Link",
            "field": "href"
          },
          "directive": "default"
        },
        "argument": "",
        "value": "\"\""
      },
      {
        "tag": "CreateField",
        "model": "Link",
        "field": "id",
        "type": "String",
        "arity": "Required"
      },
      {
        "tag": "CreateDirective",
        "location": {
          "path": {
            "tag": "Field",
            "model": "Link",
            "field": "id"
          },
          "directive": "id"
        }
      },
      {
        "tag": "CreateField",
        "model": "Link",
        "field": "image",
        "type": "String",
        "arity": "Optional"
      },
      {
        "tag": "CreateField",
        "model": "Link",
        "field": "notes",
        "type": "String",
        "arity": "Required"
      },
      {
        "tag": "CreateDirective",
        "location": {
          "path": {
            "tag": "Field",
            "model": "Link",
            "field": "notes"
          },
          "directive": "default"
        }
      },
      {
        "tag": "CreateArgument",
        "location": {
          "tag": "Directive",
          "path": {
            "tag": "Field",
            "model": "Link",
            "field": "notes"
          },
          "directive": "default"
        },
        "argument": "",
        "value": "\"\""
      },
      {
        "tag": "CreateField",
        "model": "Link",
        "field": "title",
        "type": "String",
        "arity": "Optional"
      },
      {
        "tag": "CreateField",
        "model": "Link",
        "field": "updatedAt",
        "type": "DateTime",
        "arity": "Required"
      },
      {
        "tag": "CreateField",
        "model": "Link",
        "field": "user",
        "type": "User",
        "arity": "Required"
      },
      {
        "tag": "CreateField",
        "model": "Link",
        "field": "item",
        "type": "Item",
        "arity": "Optional"
      },
      {
        "tag": "CreateModel",
        "model": "Note"
      },
      {
        "tag": "CreateField",
        "model": "Note",
        "field": "createdAt",
        "type": "DateTime",
        "arity": "Required"
      },
      {
        "tag": "CreateField",
        "model": "Note",
        "field": "id",
        "type": "String",
        "arity": "Required"
      },
      {
        "tag": "CreateDirective",
        "location": {
          "path": {
            "tag": "Field",
            "model": "Note",
            "field": "id"
          },
          "directive": "id"
        }
      },
      {
        "tag": "CreateField",
        "model": "Note",
        "field": "raw",
        "type": "String",
        "arity": "Required"
      },
      {
        "tag": "CreateDirective",
        "location": {
          "path": {
            "tag": "Field",
            "model": "Note",
            "field": "raw"
          },
          "directive": "default"
        }
      },
      {
        "tag": "CreateArgument",
        "location": {
          "tag": "Directive",
          "path": {
            "tag": "Field",
            "model": "Note",
            "field": "raw"
          },
          "directive": "default"
        },
        "argument": "",
        "value": "\"\""
      },
      {
        "tag": "CreateField",
        "model": "Note",
        "field": "text",
        "type": "String",
        "arity": "Required"
      },
      {
        "tag": "CreateDirective",
        "location": {
          "path": {
            "tag": "Field",
            "model": "Note",
            "field": "text"
          },
          "directive": "default"
        }
      },
      {
        "tag": "CreateArgument",
        "location": {
          "tag": "Directive",
          "path": {
            "tag": "Field",
            "model": "Note",
            "field": "text"
          },
          "directive": "default"
        },
        "argument": "",
        "value": "\"\""
      },
      {
        "tag": "CreateField",
        "model": "Note",
        "field": "updatedAt",
        "type": "DateTime",
        "arity": "Required"
      },
      {
        "tag": "CreateField",
        "model": "Note",
        "field": "user",
        "type": "User",
        "arity": "Required"
      },
      {
        "tag": "CreateField",
        "model": "Note",
        "field": "item",
        "type": "Item",
        "arity": "Optional"
      },
      {
        "tag": "CreateModel",
        "model": "UploadGroup"
      },
      {
        "tag": "CreateField",
        "model": "UploadGroup",
        "field": "createdAt",
        "type": "DateTime",
        "arity": "Required"
      },
      {
        "tag": "CreateField",
        "model": "UploadGroup",
        "field": "id",
        "type": "String",
        "arity": "Required"
      },
      {
        "tag": "CreateDirective",
        "location": {
          "path": {
            "tag": "Field",
            "model": "UploadGroup",
            "field": "id"
          },
          "directive": "id"
        }
      },
      {
        "tag": "CreateField",
        "model": "UploadGroup",
        "field": "isComplete",
        "type": "Boolean",
        "arity": "Optional"
      },
      {
        "tag": "CreateField",
        "model": "UploadGroup",
        "field": "isFailed",
        "type": "Boolean",
        "arity": "Optional"
      },
      {
        "tag": "CreateField",
        "model": "UploadGroup",
        "field": "updatedAt",
        "type": "DateTime",
        "arity": "Required"
      },
      {
        "tag": "CreateField",
        "model": "UploadGroup",
        "field": "user",
        "type": "User",
        "arity": "Required"
      },
      {
        "tag": "CreateField",
        "model": "UploadGroup",
        "field": "files",
        "type": "File",
        "arity": "List"
      },
      {
        "tag": "CreateModel",
        "model": "User"
      },
      {
        "tag": "CreateField",
        "model": "User",
        "field": "email",
        "type": "String",
        "arity": "Required"
      },
      {
        "tag": "CreateDirective",
        "location": {
          "path": {
            "tag": "Field",
            "model": "User",
            "field": "email"
          },
          "directive": "default"
        }
      },
      {
        "tag": "CreateArgument",
        "location": {
          "tag": "Directive",
          "path": {
            "tag": "Field",
            "model": "User",
            "field": "email"
          },
          "directive": "default"
        },
        "argument": "",
        "value": "\"\""
      },
      {
        "tag": "CreateDirective",
        "location": {
          "path": {
            "tag": "Field",
            "model": "User",
            "field": "email"
          },
          "directive": "unique"
        }
      },
      {
        "tag": "CreateField",
        "model": "User",
        "field": "firstName",
        "type": "String",
        "arity": "Optional"
      },
      {
        "tag": "CreateField",
        "model": "User",
        "field": "id",
        "type": "String",
        "arity": "Required"
      },
      {
        "tag": "CreateDirective",
        "location": {
          "path": {
            "tag": "Field",
            "model": "User",
            "field": "id"
          },
          "directive": "id"
        }
      },
      {
        "tag": "CreateField",
        "model": "User",
        "field": "lastName",
        "type": "String",
        "arity": "Optional"
      },
      {
        "tag": "CreateField",
        "model": "User",
        "field": "files",
        "type": "File",
        "arity": "List"
      },
      {
        "tag": "CreateField",
        "model": "User",
        "field": "googleAccounts",
        "type": "GoogleAccount",
        "arity": "List"
      },
      {
        "tag": "CreateField",
        "model": "User",
        "field": "items",
        "type": "Item",
        "arity": "List"
      },
      {
        "tag": "CreateField",
        "model": "User",
        "field": "labels",
        "type": "Label",
        "arity": "List"
      },
      {
        "tag": "CreateField",
        "model": "User",
        "field": "links",
        "type": "Link",
        "arity": "List"
      },
      {
        "tag": "CreateField",
        "model": "User",
        "field": "notes",
        "type": "Note",
        "arity": "List"
      },
      {
        "tag": "CreateField",
        "model": "User",
        "field": "uploadGroups",
        "type": "UploadGroup",
        "arity": "List"
      },
      {
        "tag": "CreateField",
        "model": "Item",
        "field": "isResolved",
        "type": "Boolean",
        "arity": "Required"
      },
      {
        "tag": "CreateDirective",
        "location": {
          "path": {
            "tag": "Field",
            "model": "Item",
            "field": "isResolved"
          },
          "directive": "default"
        }
      },
      {
        "tag": "CreateArgument",
        "location": {
          "tag": "Directive",
          "path": {
            "tag": "Field",
            "model": "Item",
            "field": "isResolved"
          },
          "directive": "default"
        },
        "argument": "",
        "value": "false"
      },
      {
        "tag": "CreateField",
        "model": "Item",
        "field": "status",
        "type": "String",
        "arity": "Optional"
      },
      {
        "tag": "DeleteField",
        "model": "Item",
        "field": "isResolved"
      },
      {
        "tag": "CreateDirective",
        "location": {
          "path": {
            "tag": "Field",
            "model": "Item",
            "field": "status"
          },
          "directive": "default"
        }
      },
      {
        "tag": "CreateArgument",
        "location": {
          "tag": "Directive",
          "path": {
            "tag": "Field",
            "model": "Item",
            "field": "status"
          },
          "directive": "default"
        },
        "argument": "",
        "value": "\"NOT_STARTED\""
      }
    ],
    "stepsToApply": [
      {
        "tag": "CreateSource",
        "source": "postgresql"
      },
      {
        "tag": "CreateArgument",
        "location": {
          "tag": "Source",
          "source": "postgresql"
        },
        "argument": "provider",
        "value": "\"postgresql\""
      },
      {
        "tag": "CreateArgument",
        "location": {
          "tag": "Source",
          "source": "postgresql"
        },
        "argument": "url",
        "value": "env(\"POSTGRESQL_URL\")"
      },
      {
        "tag": "DeleteSource",
        "source": "db"
      },
      {
        "tag": "CreateModel",
        "model": "InviteCode"
      },
      {
        "tag": "CreateField",
        "model": "InviteCode",
        "field": "id",
        "type": "String",
        "arity": "Required"
      },
      {
        "tag": "CreateDirective",
        "location": {
          "path": {
            "tag": "Field",
            "model": "InviteCode",
            "field": "id"
          },
          "directive": "id"
        }
      },
      {
        "tag": "CreateDirective",
        "location": {
          "path": {
            "tag": "Field",
            "model": "InviteCode",
            "field": "id"
          },
          "directive": "default"
        }
      },
      {
        "tag": "CreateArgument",
        "location": {
          "tag": "Directive",
          "path": {
            "tag": "Field",
            "model": "InviteCode",
            "field": "id"
          },
          "directive": "default"
        },
        "argument": "",
        "value": "cuid()"
      },
      {
        "tag": "CreateField",
        "model": "InviteCode",
        "field": "code",
        "type": "String",
        "arity": "Required"
      },
      {
        "tag": "CreateField",
        "model": "InviteCode",
        "field": "users",
        "type": "User",
        "arity": "List"
      },
      {
        "tag": "CreateField",
        "model": "InviteCode",
        "field": "createdAt",
        "type": "DateTime",
        "arity": "Required"
      },
      {
        "tag": "CreateDirective",
        "location": {
          "path": {
            "tag": "Field",
            "model": "InviteCode",
            "field": "createdAt"
          },
          "directive": "default"
        }
      },
      {
        "tag": "CreateArgument",
        "location": {
          "tag": "Directive",
          "path": {
            "tag": "Field",
            "model": "InviteCode",
            "field": "createdAt"
          },
          "directive": "default"
        },
        "argument": "",
        "value": "now()"
      },
      {
        "tag": "CreateField",
        "model": "InviteCode",
        "field": "updatedAt",
        "type": "DateTime",
        "arity": "Required"
      },
      {
        "tag": "CreateDirective",
        "location": {
          "path": {
            "tag": "Field",
            "model": "InviteCode",
            "field": "updatedAt"
          },
          "directive": "updatedAt"
        }
      },
      {
        "tag": "CreateModel",
        "model": "Email"
      },
      {
        "tag": "CreateField",
        "model": "Email",
        "field": "id",
        "type": "String",
        "arity": "Required"
      },
      {
        "tag": "CreateDirective",
        "location": {
          "path": {
            "tag": "Field",
            "model": "Email",
            "field": "id"
          },
          "directive": "id"
        }
      },
      {
        "tag": "CreateDirective",
        "location": {
          "path": {
            "tag": "Field",
            "model": "Email",
            "field": "id"
          },
          "directive": "default"
        }
      },
      {
        "tag": "CreateArgument",
        "location": {
          "tag": "Directive",
          "path": {
            "tag": "Field",
            "model": "Email",
            "field": "id"
          },
          "directive": "default"
        },
        "argument": "",
        "value": "cuid()"
      },
      {
        "tag": "CreateField",
        "model": "Email",
        "field": "email",
        "type": "String",
        "arity": "Required"
      },
      {
        "tag": "CreateField",
        "model": "Email",
        "field": "createdAt",
        "type": "DateTime",
        "arity": "Required"
      },
      {
        "tag": "CreateDirective",
        "location": {
          "path": {
            "tag": "Field",
            "model": "Email",
            "field": "createdAt"
          },
          "directive": "default"
        }
      },
      {
        "tag": "CreateArgument",
        "location": {
          "tag": "Directive",
          "path": {
            "tag": "Field",
            "model": "Email",
            "field": "createdAt"
          },
          "directive": "default"
        },
        "argument": "",
        "value": "now()"
      },
      {
        "tag": "CreateField",
        "model": "Email",
        "field": "updatedAt",
        "type": "DateTime",
        "arity": "Required"
      },
      {
        "tag": "CreateDirective",
        "location": {
          "path": {
            "tag": "Field",
            "model": "Email",
            "field": "updatedAt"
          },
          "directive": "updatedAt"
        }
      },
      {
        "tag": "CreateDirective",
        "location": {
          "path": {
            "tag": "Field",
            "model": "File",
            "field": "createdAt"
          },
          "directive": "default"
        }
      },
      {
        "tag": "CreateArgument",
        "location": {
          "tag": "Directive",
          "path": {
            "tag": "Field",
            "model": "File",
            "field": "createdAt"
          },
          "directive": "default"
        },
        "argument": "",
        "value": "now()"
      },
      {
        "tag": "CreateDirective",
        "location": {
          "path": {
            "tag": "Field",
            "model": "File",
            "field": "id"
          },
          "directive": "default"
        }
      },
      {
        "tag": "CreateArgument",
        "location": {
          "tag": "Directive",
          "path": {
            "tag": "Field",
            "model": "File",
            "field": "id"
          },
          "directive": "default"
        },
        "argument": "",
        "value": "cuid()"
      },
      {
        "tag": "CreateDirective",
        "location": {
          "path": {
            "tag": "Field",
            "model": "File",
            "field": "updatedAt"
          },
          "directive": "updatedAt"
        }
      },
      {
        "tag": "CreateDirective",
        "location": {
          "path": {
            "tag": "Field",
            "model": "GoogleAccount",
            "field": "createdAt"
          },
          "directive": "default"
        }
      },
      {
        "tag": "CreateArgument",
        "location": {
          "tag": "Directive",
          "path": {
            "tag": "Field",
            "model": "GoogleAccount",
            "field": "createdAt"
          },
          "directive": "default"
        },
        "argument": "",
        "value": "now()"
      },
      {
        "tag": "CreateDirective",
        "location": {
          "path": {
            "tag": "Field",
            "model": "GoogleAccount",
            "field": "id"
          },
          "directive": "default"
        }
      },
      {
        "tag": "CreateArgument",
        "location": {
          "tag": "Directive",
          "path": {
            "tag": "Field",
            "model": "GoogleAccount",
            "field": "id"
          },
          "directive": "default"
        },
        "argument": "",
        "value": "cuid()"
      },
      {
        "tag": "CreateDirective",
        "location": {
          "path": {
            "tag": "Field",
            "model": "GoogleAccount",
            "field": "updatedAt"
          },
          "directive": "updatedAt"
        }
      },
      {
        "tag": "CreateDirective",
        "location": {
          "path": {
            "tag": "Field",
            "model": "Item",
            "field": "createdAt"
          },
          "directive": "default"
        }
      },
      {
        "tag": "CreateArgument",
        "location": {
          "tag": "Directive",
          "path": {
            "tag": "Field",
            "model": "Item",
            "field": "createdAt"
          },
          "directive": "default"
        },
        "argument": "",
        "value": "now()"
      },
      {
        "tag": "CreateDirective",
        "location": {
          "path": {
            "tag": "Field",
            "model": "Item",
            "field": "id"
          },
          "directive": "default"
        }
      },
      {
        "tag": "CreateArgument",
        "location": {
          "tag": "Directive",
          "path": {
            "tag": "Field",
            "model": "Item",
            "field": "id"
          },
          "directive": "default"
        },
        "argument": "",
        "value": "cuid()"
      },
      {
        "tag": "CreateDirective",
        "location": {
          "path": {
            "tag": "Field",
            "model": "Item",
            "field": "updatedAt"
          },
          "directive": "updatedAt"
        }
      },
      {
        "tag": "CreateDirective",
        "location": {
          "path": {
            "tag": "Field",
            "model": "Label",
            "field": "createdAt"
          },
          "directive": "default"
        }
      },
      {
        "tag": "CreateArgument",
        "location": {
          "tag": "Directive",
          "path": {
            "tag": "Field",
            "model": "Label",
            "field": "createdAt"
          },
          "directive": "default"
        },
        "argument": "",
        "value": "now()"
      },
      {
        "tag": "CreateDirective",
        "location": {
          "path": {
            "tag": "Field",
            "model": "Label",
            "field": "id"
          },
          "directive": "default"
        }
      },
      {
        "tag": "CreateArgument",
        "location": {
          "tag": "Directive",
          "path": {
            "tag": "Field",
            "model": "Label",
            "field": "id"
          },
          "directive": "default"
        },
        "argument": "",
        "value": "cuid()"
      },
      {
        "tag": "CreateDirective",
        "location": {
          "path": {
            "tag": "Field",
            "model": "Label",
            "field": "updatedAt"
          },
          "directive": "updatedAt"
        }
      },
      {
        "tag": "CreateDirective",
        "location": {
          "path": {
            "tag": "Field",
            "model": "Link",
            "field": "createdAt"
          },
          "directive": "default"
        }
      },
      {
        "tag": "CreateArgument",
        "location": {
          "tag": "Directive",
          "path": {
            "tag": "Field",
            "model": "Link",
            "field": "createdAt"
          },
          "directive": "default"
        },
        "argument": "",
        "value": "now()"
      },
      {
        "tag": "CreateDirective",
        "location": {
          "path": {
            "tag": "Field",
            "model": "Link",
            "field": "id"
          },
          "directive": "default"
        }
      },
      {
        "tag": "CreateArgument",
        "location": {
          "tag": "Directive",
          "path": {
            "tag": "Field",
            "model": "Link",
            "field": "id"
          },
          "directive": "default"
        },
        "argument": "",
        "value": "cuid()"
      },
      {
        "tag": "CreateDirective",
        "location": {
          "path": {
            "tag": "Field",
            "model": "Link",
            "field": "updatedAt"
          },
          "directive": "updatedAt"
        }
      },
      {
        "tag": "CreateDirective",
        "location": {
          "path": {
            "tag": "Field",
            "model": "Note",
            "field": "createdAt"
          },
          "directive": "default"
        }
      },
      {
        "tag": "CreateArgument",
        "location": {
          "tag": "Directive",
          "path": {
            "tag": "Field",
            "model": "Note",
            "field": "createdAt"
          },
          "directive": "default"
        },
        "argument": "",
        "value": "now()"
      },
      {
        "tag": "CreateDirective",
        "location": {
          "path": {
            "tag": "Field",
            "model": "Note",
            "field": "id"
          },
          "directive": "default"
        }
      },
      {
        "tag": "CreateArgument",
        "location": {
          "tag": "Directive",
          "path": {
            "tag": "Field",
            "model": "Note",
            "field": "id"
          },
          "directive": "default"
        },
        "argument": "",
        "value": "cuid()"
      },
      {
        "tag": "CreateDirective",
        "location": {
          "path": {
            "tag": "Field",
            "model": "Note",
            "field": "updatedAt"
          },
          "directive": "updatedAt"
        }
      },
      {
        "tag": "CreateDirective",
        "location": {
          "path": {
            "tag": "Field",
            "model": "UploadGroup",
            "field": "createdAt"
          },
          "directive": "default"
        }
      },
      {
        "tag": "CreateArgument",
        "location": {
          "tag": "Directive",
          "path": {
            "tag": "Field",
            "model": "UploadGroup",
            "field": "createdAt"
          },
          "directive": "default"
        },
        "argument": "",
        "value": "now()"
      },
      {
        "tag": "CreateDirective",
        "location": {
          "path": {
            "tag": "Field",
            "model": "UploadGroup",
            "field": "id"
          },
          "directive": "default"
        }
      },
      {
        "tag": "CreateArgument",
        "location": {
          "tag": "Directive",
          "path": {
            "tag": "Field",
            "model": "UploadGroup",
            "field": "id"
          },
          "directive": "default"
        },
        "argument": "",
        "value": "cuid()"
      },
      {
        "tag": "CreateDirective",
        "location": {
          "path": {
            "tag": "Field",
            "model": "UploadGroup",
            "field": "updatedAt"
          },
          "directive": "updatedAt"
        }
      },
      {
        "tag": "CreateField",
        "model": "User",
        "field": "role",
        "type": "String",
        "arity": "Required"
      },
      {
        "tag": "CreateDirective",
        "location": {
          "path": {
            "tag": "Field",
            "model": "User",
            "field": "role"
          },
          "directive": "default"
        }
      },
      {
        "tag": "CreateArgument",
        "location": {
          "tag": "Directive",
          "path": {
            "tag": "Field",
            "model": "User",
            "field": "role"
          },
          "directive": "default"
        },
        "argument": "",
        "value": "\"\""
      },
      {
        "tag": "CreateField",
        "model": "User",
        "field": "isActive",
        "type": "Boolean",
        "arity": "Required"
      },
      {
        "tag": "CreateDirective",
        "location": {
          "path": {
            "tag": "Field",
            "model": "User",
            "field": "isActive"
          },
          "directive": "default"
        }
      },
      {
        "tag": "CreateArgument",
        "location": {
          "tag": "Directive",
          "path": {
            "tag": "Field",
            "model": "User",
            "field": "isActive"
          },
          "directive": "default"
        },
        "argument": "",
        "value": "false"
      },
      {
        "tag": "CreateField",
        "model": "User",
        "field": "inviteCode",
        "type": "InviteCode",
        "arity": "Optional"
      },
      {
        "tag": "CreateField",
        "model": "User",
        "field": "createdAt",
        "type": "DateTime",
        "arity": "Required"
      },
      {
        "tag": "CreateDirective",
        "location": {
          "path": {
            "tag": "Field",
            "model": "User",
            "field": "createdAt"
          },
          "directive": "default"
        }
      },
      {
        "tag": "CreateArgument",
        "location": {
          "tag": "Directive",
          "path": {
            "tag": "Field",
            "model": "User",
            "field": "createdAt"
          },
          "directive": "default"
        },
        "argument": "",
        "value": "now()"
      },
      {
        "tag": "CreateField",
        "model": "User",
        "field": "updatedAt",
        "type": "DateTime",
        "arity": "Required"
      },
      {
        "tag": "CreateDirective",
        "location": {
          "path": {
            "tag": "Field",
            "model": "User",
            "field": "updatedAt"
          },
          "directive": "updatedAt"
        }
      },
      {
        "tag": "CreateDirective",
        "location": {
          "path": {
            "tag": "Field",
            "model": "User",
            "field": "id"
          },
          "directive": "default"
        }
      },
      {
        "tag": "CreateArgument",
        "location": {
          "tag": "Directive",
          "path": {
            "tag": "Field",
            "model": "User",
            "field": "id"
          },
          "directive": "default"
        },
        "argument": "",
        "value": "cuid()"
      }
    ],
    "sourceConfig": "generator js {\n  provider = \"prisma-client-js\"\n}\n\ndatasource postgresql {\n  provider = \"postgresql\"\n  url      = env(\"POSTGRESQL_URL\")\n}\n\nmodel InviteCode {\n  id String @id @default(cuid())\n\n  code String\n\n  users User[]\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n}\n\nmodel Email {\n  id String @id @default(cuid())\n\n  email String\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n}\n\nmodel File {\n  extension           String   @default(\"\")\n  hasStartedUploading Boolean?\n  height              Int?\n  id                  String   @id @default(cuid())\n  isFailed            Boolean?\n  isUploaded          Boolean?\n  item                Item\n  name                String   @default(\"\")\n  size                String?\n\n  uploadGroup UploadGroup\n  user        User\n  width       Int?\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n}\n\nmodel GoogleAccount {\n  accountId    String? @unique\n  email        String?\n  firstName    String?\n  id           String  @id @default(cuid())\n  lastName     String?\n  picture      String?\n  refreshToken String?\n  user         User\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n}\n\nmodel Item {\n  id          String   @id @default(cuid())\n  isFavorited Boolean  @default(false)\n  status      String?  @default(\"NOT_STARTED\")\n  link        Link?\n  note        Note?\n  type        String   @default(\"\")\n  user        User?\n  file        File?\n  labels      Label[]\n  createdAt   DateTime @default(now())\n  updatedAt   DateTime @updatedAt\n}\n\nmodel Label {\n  id        String   @id @default(cuid())\n  name      String   @default(\"\")\n  user      User\n  items     Item[]\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n}\n\nmodel Link {\n  description String?\n  favicon     String?\n  href        String  @default(\"\")\n  id          String  @id @default(cuid())\n  image       String?\n  notes       String  @default(\"\")\n  title       String?\n  user        User\n  item        Item?\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n}\n\nmodel Note {\n  id        String   @id @default(cuid())\n  raw       String   @default(\"\")\n  text      String   @default(\"\")\n  user      User\n  item      Item?\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n}\n\nmodel UploadGroup {\n  id         String   @id @default(cuid())\n  isComplete Boolean?\n  isFailed   Boolean?\n  user       User\n  files      File[]\n  createdAt  DateTime @default(now())\n  updatedAt  DateTime @updatedAt\n}\n\nmodel User {\n  email          String          @default(\"\") @unique\n  firstName      String?\n  id             String          @id @default(cuid())\n  lastName       String?\n  files          File[]\n  googleAccounts GoogleAccount[]\n  items          Item[]\n  labels         Label[]\n  links          Link[]\n  notes          Note[]\n  uploadGroups   UploadGroup[]\n\n  role     String  @default(\"\")\n  isActive Boolean @default(false)\n\n  inviteCode InviteCode?\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n}"
  }
}
```

## Stack Trace
```bash
Jan 26 15:50:20.396  INFO migration_engine: Starting migration engine RPC server git_hash="e7579bd35e0938dbf773f1706c098a0d14a5a038"
Jan 26 15:50:20.404  INFO quaint::single: Starting a postgresql pool with 1 connections.    
Jan 26 15:50:20.419  INFO ListMigrations: migration_engine::commands::list_migrations: Returning 4 migrations (0 pending).
```
