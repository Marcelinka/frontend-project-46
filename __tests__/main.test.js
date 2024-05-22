import { test } from '@jest/globals';
import gendiff from '../src/main.js';

describe('gendiff', () => {
  test('should compare two plain files', () => {
    const result = `{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`;

    expect(gendiff('./__fixtures__/file1.json', './__fixtures__/file2.json')).toEqual(result);
    expect(gendiff('./__fixtures__/file1.yaml', './__fixtures__/file2.yaml')).toEqual(result);
  });

  test('should compare two plain files with plain format', () => {
    const result = `Property 'follow' was removed
Property 'proxy' was removed
Property 'timeout' was updated. From 50 to 20
Property 'verbose' was added with value: true`;

    expect(gendiff('./__fixtures__/file1.json', './__fixtures__/file2.json', 'plain')).toEqual(result);
    expect(gendiff('./__fixtures__/file1.yaml', './__fixtures__/file2.yaml', 'plain')).toEqual(result);
  });

  test('should compare two plain files with json format', () => {
    const result = `[
    {
        "key": "follow",
        "diffType": "removed",
        "propertyType": "value",
        "oldValue": false
    },
    {
        "key": "host",
        "diffType": "equal",
        "propertyType": "value",
        "oldValue": "hexlet.io",
        "newValue": "hexlet.io"
    },
    {
        "key": "proxy",
        "diffType": "removed",
        "propertyType": "value",
        "oldValue": "123.234.53.22"
    },
    {
        "key": "timeout",
        "diffType": "updated",
        "propertyType": "value",
        "oldValue": 50,
        "newValue": 20
    },
    {
        "key": "verbose",
        "diffType": "added",
        "propertyType": "value",
        "newValue": true
    }
]`;

    expect(gendiff('./__fixtures__/file1.json', './__fixtures__/file2.json', 'json')).toEqual(result);
    expect(gendiff('./__fixtures__/file1.yaml', './__fixtures__/file2.yaml', 'json')).toEqual(result);
  });

  test('should compare two files with complex structure', () => {
    const result = `{
    common: {
      + follow: false
        setting1: Value 1
      - setting2: 200
      - setting3: true
      + setting3: null
      + setting4: blah blah
      + setting5: {
            key5: value5
        }
        setting6: {
            doge: {
              - wow: 
              + wow: so much
            }
            key: value
          + ops: vops
        }
    }
    group1: {
      - baz: bas
      + baz: bars
        foo: bar
      - nest: {
            key: value
        }
      + nest: str
    }
  - group2: {
        abc: 12345
        deep: {
            id: 45
        }
    }
  + group3: {
        deep: {
            id: {
                number: 45
            }
        }
        fee: 100500
    }
}`;

    expect(gendiff('./__fixtures__/file3.json', './__fixtures__/file4.json')).toEqual(result);
    expect(gendiff('./__fixtures__/file3.yaml', './__fixtures__/file4.yaml')).toEqual(result);
  });

  test('should compare two files with complex structure with plain format', () => {
    const result = `Property 'common.follow' was added with value: false
Property 'common.setting2' was removed
Property 'common.setting3' was updated. From true to null
Property 'common.setting4' was added with value: 'blah blah'
Property 'common.setting5' was added with value: [complex value]
Property 'common.setting6.doge.wow' was updated. From '' to 'so much'
Property 'common.setting6.ops' was added with value: 'vops'
Property 'group1.baz' was updated. From 'bas' to 'bars'
Property 'group1.nest' was updated. From [complex value] to 'str'
Property 'group2' was removed
Property 'group3' was added with value: [complex value]`;

    expect(gendiff('./__fixtures__/file3.json', './__fixtures__/file4.json', 'plain')).toEqual(result);
    expect(gendiff('./__fixtures__/file3.yaml', './__fixtures__/file4.yaml', 'plain')).toEqual(result);
  });

  test('should compare two files with complex structure with json format', () => {
    const result = `[
    {
        "key": "common",
        "diffType": "updated",
        "propertyType": "nested",
        "children": [
            {
                "key": "follow",
                "diffType": "added",
                "propertyType": "value",
                "newValue": false
            },
            {
                "key": "setting1",
                "diffType": "equal",
                "propertyType": "value",
                "oldValue": "Value 1",
                "newValue": "Value 1"
            },
            {
                "key": "setting2",
                "diffType": "removed",
                "propertyType": "value",
                "oldValue": 200
            },
            {
                "key": "setting3",
                "diffType": "updated",
                "propertyType": "value",
                "oldValue": true,
                "newValue": null
            },
            {
                "key": "setting4",
                "diffType": "added",
                "propertyType": "value",
                "newValue": "blah blah"
            },
            {
                "key": "setting5",
                "diffType": "added",
                "propertyType": "value",
                "newValue": {
                    "key5": "value5"
                }
            },
            {
                "key": "setting6",
                "diffType": "updated",
                "propertyType": "nested",
                "children": [
                    {
                        "key": "doge",
                        "diffType": "updated",
                        "propertyType": "nested",
                        "children": [
                            {
                                "key": "wow",
                                "diffType": "updated",
                                "propertyType": "value",
                                "oldValue": "",
                                "newValue": "so much"
                            }
                        ]
                    },
                    {
                        "key": "key",
                        "diffType": "equal",
                        "propertyType": "value",
                        "oldValue": "value",
                        "newValue": "value"
                    },
                    {
                        "key": "ops",
                        "diffType": "added",
                        "propertyType": "value",
                        "newValue": "vops"
                    }
                ]
            }
        ]
    },
    {
        "key": "group1",
        "diffType": "updated",
        "propertyType": "nested",
        "children": [
            {
                "key": "baz",
                "diffType": "updated",
                "propertyType": "value",
                "oldValue": "bas",
                "newValue": "bars"
            },
            {
                "key": "foo",
                "diffType": "equal",
                "propertyType": "value",
                "oldValue": "bar",
                "newValue": "bar"
            },
            {
                "key": "nest",
                "diffType": "updated",
                "propertyType": "value",
                "oldValue": {
                    "key": "value"
                },
                "newValue": "str"
            }
        ]
    },
    {
        "key": "group2",
        "diffType": "removed",
        "propertyType": "value",
        "oldValue": {
            "abc": 12345,
            "deep": {
                "id": 45
            }
        }
    },
    {
        "key": "group3",
        "diffType": "added",
        "propertyType": "value",
        "newValue": {
            "deep": {
                "id": {
                    "number": 45
                }
            },
            "fee": 100500
        }
    }
]`;

    expect(gendiff('./__fixtures__/file3.json', './__fixtures__/file4.json', 'json')).toEqual(result);
    expect(gendiff('./__fixtures__/file3.yaml', './__fixtures__/file4.yaml', 'json')).toEqual(result);
  });
});
