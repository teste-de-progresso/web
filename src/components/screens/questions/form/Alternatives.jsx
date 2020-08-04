import React from "react";
import {Input} from "../../../widgets/Input";
import {InputGroup} from "../../../widgets/InputGroup";
import {Card} from "../../../widgets/Card";
import {CardGrid} from "../../../widgets/CardGrid";

export const Alternatives = ({ register }) => {
  const identifiers = ['A', 'B', 'C', 'D', 'E'];

  return (
    <CardGrid>
      {identifiers.map((identifier) => {
        return <Option key={identifier} identifer={identifier} register={register} />;
      })}
    </CardGrid>
  );
};

const Option = ({ identifer, text, register }) => {
  return (
    <Card title={`Opção ${identifer}`} action={() => (
        <div>
          <input type={"radio"} id={`radio-${identifer}`} name={"correct-question"} value={identifer}/>
        </div>
    )}>
      <div className="p-1">
        <InputGroup>
          <label>Descrição</label>
          <Input
              name={`${identifer}-text`}
              ref={register}
              value={text}
              multiline
          />
        </InputGroup>
      </div>
    </Card>
  );
};
