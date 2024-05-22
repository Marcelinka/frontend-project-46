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
        "propertyType": "value",
        "oldValue": false,
        "diffType": "removed"
    },
    {
        "key": "host",
        "propertyType": "value",
        "oldValue": "hexlet.io",
        "newValue": "hexlet.io",
        "diffType": "equal"
    },
    {
        "key": "proxy",
        "propertyType": "value",
        "oldValue": "123.234.53.22",
        "diffType": "removed"
    },
    {
        "key": "timeout",
        "propertyType": "value",
        "oldValue": 50,
        "newValue": 20,
        "diffType": "updated"
    },
    {
        "key": "verbose",
        "propertyType": "value",
        "newValue": true,
        "diffType": "added"
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
                "propertyType": "value",
                "newValue": false,
                "diffType": "added"
            },
            {
                "key": "setting1",
                "propertyType": "value",
                "oldValue": "Value 1",
                "newValue": "Value 1",
                "diffType": "equal"
            },
            {
                "key": "setting2",
                "propertyType": "value",
                "oldValue": 200,
                "diffType": "removed"
            },
            {
                "key": "setting3",
                "propertyType": "value",
                "oldValue": true,
                "newValue": null,
                "diffType": "updated"
            },
            {
                "key": "setting4",
                "propertyType": "value",
                "newValue": "blah blah",
                "diffType": "added"
            },
            {
                "key": "setting5",
                "propertyType": "value",
                "newValue": {
                    "key5": "value5"
                },
                "diffType": "added"
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
                                "propertyType": "value",
                                "oldValue": "",
                                "newValue": "so much",
                                "diffType": "updated"
                            }
                        ]
                    },
                    {
                        "key": "key",
                        "propertyType": "value",
                        "oldValue": "value",
                        "newValue": "value",
                        "diffType": "equal"
                    },
                    {
                        "key": "ops",
                        "propertyType": "value",
                        "newValue": "vops",
                        "diffType": "added"
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
                "propertyType": "value",
                "oldValue": "bas",
                "newValue": "bars",
                "diffType": "updated"
            },
            {
                "key": "foo",
                "propertyType": "value",
                "oldValue": "bar",
                "newValue": "bar",
                "diffType": "equal"
            },
            {
                "key": "nest",
                "propertyType": "value",
                "oldValue": {
                    "key": "value"
                },
                "newValue": "str",
                "diffType": "updated"
            }
        ]
    },
    {
        "key": "group2",
        "propertyType": "value",
        "oldValue": {
            "abc": 12345,
            "deep": {
                "id": 45
            }
        },
        "diffType": "removed"
    },
    {
        "key": "group3",
        "propertyType": "value",
        "newValue": {
            "deep": {
                "id": {
                    "number": 45
                }
            },
            "fee": 100500
        },
        "diffType": "added"
    }
]`;

    expect(gendiff('./__fixtures__/file3.json', './__fixtures__/file4.json', 'json')).toEqual(result);
    expect(gendiff('./__fixtures__/file3.yaml', './__fixtures__/file4.yaml', 'json')).toEqual(result);
  });
});
