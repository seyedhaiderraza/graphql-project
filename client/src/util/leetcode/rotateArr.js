/*
 * @param {number[]} nums
 * @param {number} k
 * @return {void} Do not return anything, modify nums in-place instead.
 //
var rotate = function(nums, k) {

    nums.length==2? k%2==0?nums:nums.unshift(nums.pop()) :
    nums.length-k>0?nums.unshift(...nums.splice(-k)):
    nums.unshift(...nums.splice(nums.length-k))
    
    console.log(nums)
    };
    rotate([1,2],3)
    */
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}

var twoSum = function(nums, target) {
const index1=[]
    for(i=0; i<nums.length;i++){
        for(j=1;j<nums.length;j++){
            if(nums[i]+nums[j]===target){
                index1.push(i)
                index1.push(j)
                return index1;
            }
            
        }
       
    }

    
};
 */

// var twoSum = function(nums, target) {
//     let finalindexArray=[]
//     let num1=nums[0]
//     let num1Index=0
//     let num2Index=0
//     nums.splice(0,1)
//     while(nums.length!=0){
//             num2=nums.slice(0,1)
//         if(Number(num1)+Number(num2) ===target){
//             finalindexArray.push(num1Index)
//             finalindexArray.push(num2Index+1)
//             return finalindexArray
//         }else if(num2Index+1>=nums.length){
//             num1=num2
//             num1Index++
//             nums=  nums.splice(0,1)
//             num2Index=0
//         }else{
//             nums.splice(0,1)
//         num2Index++
//         }
//     }
    

// }
//console.log(twoSum([3,2,3],6));
//console.log(twoSum([2,7,11,15],9));
console.log(twoSum([3,2,4],6))//[1,2]
//console.log(twoSum([3,3],6))
