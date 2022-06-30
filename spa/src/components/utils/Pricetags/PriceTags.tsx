import React, { FC, useEffect, useState } from "react";

import "./Pricetags.scss";
import 'bootstrap/dist/css/bootstrap.min.css';
import ReactTags, { SuggestionComponentProps, Tag, TagComponentProps } from 'react-tag-autocomplete';
import _ from "lodash";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { removeAccents } from 'utils/removeAccents';
import axios from "axios";

interface ITag {
  id: string | number,
  name: string
}

interface ISuggestion {
  id: string | number,
  name: string,
}

type PriceTagsProps = {
  className?: string | null,
  id: string,
  allowChange: boolean,
  placeholderText?: string,
  showLimit: boolean;
  tags: ITag[],
  suggestions: ISuggestion[],
  noSuggestionsText?: string,
  categoryId: number,
  requiredTextInput?: boolean,
  dataTypeTextInput: string,
  onHandleChange: (tags: ITag[], categoryId: number) => void
}

const _window = (window as any).window;

const PriceTags: FC<PriceTagsProps> = (props) => {
  const [tags, setTags] = useState<ITag[]>(props.tags);

  const [suggestions, setSuggestions] = useState<ISuggestion[]>(props.suggestions);

  const [total, setTotal] = useState<number>(tags.length | 0);
  const [defaultTags, setDefaultTags] = useState<any[]>([])


  useEffect(() => {
    const configDefaultTag: any = {
      method: 'get',
      url: '/price-tag/tag-display/list/default',
    };
    const fetchData = async () => {
      try {
        const res = await axios(configDefaultTag);
        const tagsTemp = [...defaultTags];
        res.data.data.forEach((item: any) => {
          let temp = { id: "", name: item.displayContent }
          tagsTemp.push(temp);
        })
        setDefaultTags(tagsTemp)

      } catch (error) {
        console.log("error", error)
      }
    }
    fetchData();
  }, [])


  useEffect(() => {
    setTotal(tags.length);
    props.onHandleChange(tags, props.categoryId);
  }, [])

  useEffect(() => {
    setTotal(tags.length);
    props.onHandleChange(tags, props.categoryId);
  }, [tags, suggestions])

  useEffect(() => {
    if (!_.isEmpty(props.suggestions)) {
      setSuggestions(props.suggestions)
    }
  }, [props.suggestions])

  const onAddTag = (tag: { id: string | number; name: string }) => {
    const tagIsTrim = { ...tag, name: tag.name.trim() };
    if (tags.length >= 50) {
      return;
    }
    if (!_.find(tags, tagIsTrim) && !_.isEmpty(tagIsTrim.name)) {
      setTags([...tags, tagIsTrim]);
      _.remove(suggestions, (element: ISuggestion) => {
        return element.name == tag.name;
      });
    }
  };
  const onDeleteTag = (i: number) => {
    const tagsTmp = tags.slice(0);
    console.log('i', i)
    if (_.isNumber(i) && i >= 0 && _.isNumber(tagsTmp[i].id)) {
      setSuggestions([...suggestions, tagsTmp[i]]);
    }
    tagsTmp.splice(i, 1);
    setTags(tagsTmp);
  };

  const inputAttributes = {
    maxLength: 500,
    disabled: !props.allowChange,
  };

  const tagComponent = (props: TagComponentProps) => {
    return (
      <button disabled className='tag-comment'>
        <span className='tag-comment__title'>{props.tag.name}</span>
        <span className='tag-comment__icon' onClick={props.onDelete}>
          <FontAwesomeIcon icon={faTimes} />
        </span>
      </button>)
  }

  const onHandChangeTextArea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    console.log("e", e.target.value)
    let tags = [{
      id: '',
      name: e.target.value
    }]
    if (_.isEmpty(e.target.value)) {
      tags = []
    }
    setTags(tags);
    props.onHandleChange(tags, props.categoryId);
  }

  const onHandleSuggestionsTransform = (query: string, suggestions: Tag[]) => {
    const filteredSuggestions = _.filter(suggestions, (item: Tag) => {
      return removeAccents(item.name).toLowerCase().includes(query.toLowerCase()) || item.name.toLowerCase().includes(query.toLowerCase());
    })
    return filteredSuggestions;
  }

  useEffect(() => {
    $(".react-tags__search-input").on("keyup", function (e) {
      if ((e.which == 40 || e.which == 38) && _window.document.getElementById("ReactTags") != undefined) {
        _window.document.getElementById("ReactTags").scrollTop = 0;
        const offsetItem = _window.document.getElementsByClassName('is-active')[0].offsetTop + _window.document.getElementsByClassName('is-active')[0].offsetHeight;
        _window.document.getElementById("ReactTags").scrollTop = (offsetItem - _window.document.getElementById('ReactTags').offsetHeight);
      }
    });
  }, [])

  return (
    <>
      <div className="pricetag">
        <div className="pricetag__header">
          <div>Giá {props.requiredTextInput && <span className="red">*</span>}</div>
        </div>
        <div className="pricetag__tags">
          {props.dataTypeTextInput === "Tag" ?
            <div className='input-tags-comment' id={props.id} style={{ pointerEvents: props.allowChange ? 'auto' : 'none' }}>
              {/* {props.showLimit && <p className='limit-tags'>{total}/50</p>} */}
              <ReactTags
                addOnBlur={true}
                allowBackspace={true}
                allowNew={true}
                delimiters={['Enter', 'Tab', '.']}
                onAddition={onAddTag}
                onDelete={onDeleteTag}
                inputAttributes={inputAttributes}
                minQueryLength={1}
                // noSuggestionsText={props.noSuggestionsText}
                placeholderText={_.isEmpty(tags) ? props.placeholderText : ''}
                suggestions={suggestions}
                tagComponent={tagComponent}
                tags={tags}
                maxSuggestionsLength={100}
                suggestionsTransform={onHandleSuggestionsTransform}
              />
            </div> :
            <textarea className='text-area-comment' placeholder={_.isEmpty(tags) ? props.placeholderText : ''} id={props.id} rows={4} onChange={(e) => onHandChangeTextArea(e)} />
          }
        </div>

        <div className="pricetag__defaultTags">
          {defaultTags.map((val, i) => (
            <button type="button" className={tags.find((tag: any) => tag.name === val.name) ? "pricetag__btn active" : "pricetag__btn"} onClick={() => onAddTag(val)}>
              {val.name}
            </button>
          ))}
        </div>
      </div>
    </>
  )
};

export default PriceTags;
