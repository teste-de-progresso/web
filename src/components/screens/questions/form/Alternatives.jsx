import React, {useState} from "react";
import {Input} from "../../../widgets/Input";
import {InputGroup} from "../../../widgets/InputGroup";
import {Card} from "../../../widgets/Card";
import {CardGrid} from "../../../widgets/CardGrid";

export const Alternatives = ({ register }) => {
  const identifiers = ['A', 'B', 'C', 'D', 'E'];
  const [correctAlternative, setCorrectAlternative] = useState(identifiers[0]);

  return (
    <CardGrid>
      {identifiers.map((identifier) => {
        return <Option key={identifier} identifer={identifier} register={register} correctAlternative={correctAlternative} setCorrectAlternative={setCorrectAlternative}/>;
      })}
      <Card title={"Explicação"}>
        <textarea className="block rounded p-1 w-full border-gray-400 border shadow-sm"
                  name={"correct-question-explanation"}
                  ref={register}
                  multiline/>
      </Card>
    </CardGrid>
  );
};

const Option = ({ correctAlternative, setCorrectAlternative, identifer, text, register }) => {
  return (
    <Card title={`Opção ${identifer}`} action={() => (
        <input type={"radio"} id={`radio-${identifer}`} name={"correct-question"}
               value={identifer}
               checked={identifer === correctAlternative}
               onChange={() => setCorrectAlternative(identifer)}/>
    )}>
      <div className="p-1">
        <InputGroup>
          <label>Descrição</label>
          <Input className="block rounded p-1 w-full border-gray-400 border shadow-sm"
                 name={`${identifer}-text`}
                 ref={register}
                 value={text}
          />
        </InputGroup>
      </div>
    </Card>
  );
};
